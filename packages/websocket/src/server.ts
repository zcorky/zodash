import * as net from 'net';
import * as http from 'http';
import * as ws from 'ws';
import { EventEmitter } from 'events';

import { Socket, SocketOptions } from './socket';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('@zodash/websocet');

export interface ServerOptions {
  path?: string;
  pingInterval?: number;
  pingTimeout?: number;
}

export class Server {
  private emitter = new EventEmitter();
  private ws = new ws.Server({
    noServer: true,
  });

  constructor(private readonly options: ServerOptions) {
    const cancelSchedule = this.schedule();

    this.ws.on('connection', (rawSocket: ws.Socket) => {
      const socketOptions: SocketOptions = {
        pingInterval: this.options.pingInterval,
        pingTimeout: this.options.pingTimeout,
      };

      const socket = new Socket(rawSocket, socketOptions);

      // @TODO
      socket.emit('@@CONFIG', socketOptions);

      this.emitter.emit('connection', socket);
    });

    this.ws.on('close', () => {
      cancelSchedule();
    });

    debug('[start] ws app ...');
  }

  public attach(server: http.Server) {
    server.on('upgrade', (request, socket, head) => {
      const pathname = new URL(request.url).pathname;

      if (this.options.path !== pathname) {
        return;
      }

      this.handleUpgrade(request, socket, head, (client) => {
        this.emit('connection', client, request);
      });
    });
  }

  public listen(port: number, host: string, callback: () => void) {
    const server = http.createServer();
    server.listen(port, host, callback);

    this.attach(server);
    return server;
  }

  public handleUpgrade(
    request: http.IncomingMessage,
    socket: net.Socket,
    upgradeHead: Buffer,
    callback: (client: ws, request: http.IncomingMessage) => void,
  ) {
    return this.ws.handleUpgrade(
      request,
      socket as any,
      upgradeHead,
      callback,
    );
  }

  public on(event: 'connection', fn: (socket: Socket) => void): void;
  public on(event: string, fn: (...args: any[]) => void) {
    return this.emitter.on(event, fn);
  }

  public emit(
    event: 'connection',
    socket: ws,
    request: http.IncomingMessage,
  ): void;
  public emit(event: string, ...args: any[]) {
    return this.ws.emit(event, ...args);
  }

  private schedule() {
    // gc not alive
    const itIsAlive = setInterval(() => {
      debug('[schedule][gc][alive]', this.ws.clients.size);

      this.ws.clients.forEach((_client) => {
        const client = (_client as unknown) as ws.Socket;
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
        const client = (_client as unknown) as ws.Socket;
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
    };
  }
}
