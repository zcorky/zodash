import * as net from 'net';
import * as http from 'http';
import * as ws from 'ws';
import { EventEmitter } from 'events';

import { Socket } from './socket';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('@zodash/websocet');

export class Server {
  private emitter = new EventEmitter();
  private ws = new ws.Server({
    // port: 9999,
    noServer: true,
  });

  constructor() {
    const cancelSchedule = this.schedule();

    this.ws.on('connection', (socket: ws.Socket) => {
      const _socket = new Socket(socket);
      this.emitter.emit('connection', _socket);
    });

    this.ws.on('close', () => {
      cancelSchedule();
    });

    console.log('start ws app ...');
  }

  public handleUpgrade(request: http.IncomingMessage, socket: net.Socket, upgradeHead: Buffer, callback: (client: ws, request: http.IncomingMessage) => void) {
    return this.ws.handleUpgrade(request, socket, upgradeHead, callback);
  }

  public on(event: 'connection', fn: (socket: Socket) => void): void
  public on(event: string, fn: (...args: any[]) => void) {
    return this.emitter.on(event, fn);
  }

  public emit(event: 'connection', socket: ws, request: http.IncomingMessage): void
  public emit(event: string, ...args: any[]) {
    return this.ws.emit(event, ...args);
  }

  private schedule() {
    // gc not alive
    const itIsAlive = setInterval(() => {
      debug('[schedule][gc][alive]', this.ws.clients.size);

      this.ws.clients.forEach((_client) => {
        const client = _client as unknown as ws.Socket;
        if (!client.isAlive) {
          debug('[schedule][gc][alive] client:', client.id);
          return client.terminate();
        }

        client.isAlive = false;
      });
    }, (60 / 2) * 1000);

    // gc has no message in ten minutes
    const itHasMessageIn10Minutes = setInterval(() => {
      debug('[schedule][gc][nomessage]', this.ws.clients.size);

      this.ws.clients.forEach((_client) => {
        const client = _client as unknown as ws.Socket;
        if (!client.hasMessageLast10Minutes) {
          debug('[schedule][gc][nomessage] client:', client.id);
          return client.terminate();
        }

        client.hasMessageLast10Minutes = false;
      });
    }, (10 / 2) * 60 * 1000);

    return () => {
      clearInterval(itIsAlive);
      clearInterval(itHasMessageIn10Minutes);
    }
  }
}