import * as net from 'net';
import * as http from 'http';
import * as ws from 'ws';
import { uuid } from '@zodash/uuid';
import { EventEmitter } from 'events';

declare module 'ws' {
  // export interface ws {
  //   id: string;
  //   isAlive: boolean;
  // }

  export interface Socket extends ws {
    id: string;
    isAlive: boolean;
    hasMessageLast10Minutes: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
}

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

export class Socket {
  private emitter = new EventEmitter();
  public createdAt = new Date();
  public updatedAt = this.createdAt;

  constructor(private readonly socket: ws.Socket) {
    this.socket.id = uuid();
    this.socket.isAlive = true;
    this.socket.hasMessageLast10Minutes = false;

    // this.socket.on('pong', () => {
    //   this.socket.isAlive = true;
    // });

    this.socket.on('close', (...args) => {
      debug('socket disconnect:', this.id, args);
      this.socket.isAlive = false;

      this.emit('close', ...args);
    });

    this.socket.on('error', (error) => {
      // this.socket.isAlive = false;
      
      this.emit('error', error);
    });

    this.socket.on('message', (message) => {
      const [type, payload = ''] = JSON.parse(message as any as string);
      debug('onmessage:', type, payload);

      if (type != 'ping') {
        this.socket.hasMessageLast10Minutes = true;
      }

      this.emitter.emit(type, payload);
    });

    //
    this.on('ping', () => {
      this.socket.isAlive = true;

      this.emit('pong')
    });

    this.emit('id', this.socket.id);
  }

  public get id() {
    return this.socket.id;
  }

  public get isAlive() {
    return this.socket.isAlive;
  }

  public on(type: string, handler: (...args: any[]) => void) {
    this.emitter.on(type, handler);
  }

  public emit(type: string, ...args: any[]) {
    if (type === 'error') {
      return this.socket.send(JSON.stringify([
        type,
        {
          message: args[0] instanceof Error ? args[0].message : args[0],
        },
      ]));
    }

    this.socket.send(JSON.stringify([type, ...args]));
  }

  public disconnect() {
    return this.socket.terminate();
  }

  private ping() {
    return this.socket.ping();
  }
}

export class Client {
  private emitter = new EventEmitter();
  private readonly socket = new ws(this.url);
  
  public id: string;
  public isAlive: boolean;
  public createdAt = new Date();
  public updatedAt = this.createdAt;

  private pingSetTimeout: NodeJS.Timeout;

  constructor(private readonly url: string) {
    // this.socket.on('pong', () => {
    //   this.socket.isAlive = true;
    // });

    this.socket.on('close', (...args) => {
      this.isAlive = false;

      this.emitter.emit('close', ...args);
    });

    this.socket.on('error', (error) => {
      // this.isAlive = false;

      this.emitter.emit('error', error);
    });

    //
    this.on('pong', () => {
      this.isAlive = true;

      this.pingSetTimeout = setTimeout(() => {
        this.ping();
      }, 15 * 1000);
    });

    this.socket.on('open', () => {
      this.ping();
    });

    this.on('id', id => {
      debug('receive id:', id);
      this.id = id;

      this.emitter.emit('connection');
    });

    this.socket.on('message', (message) => {
      const [type, payload = ''] = JSON.parse(message as any as string);
      debug('onmessage:', type, payload);

      if (type === 'error') {
        return this.emitter.emit('error', new Error(payload?.message ?? 'unknown'));
      }

      this.emitter.emit(type, payload);
    });
  }

  public on(type: string, handler: (...args: any[]) => void) {
    this.emitter.on(type, handler);
  }

  public emit(type: string, ...args: any[]) {
    this.socket.send(JSON.stringify([type, ...args]));
  }

  public disconnect() {
    if (this.pingSetTimeout) {
      clearTimeout(this.pingSetTimeout);
      this.pingSetTimeout = null;
    }

    return this.socket.terminate();
  }

  private ping() {
    return this.emit('ping');
  }
}