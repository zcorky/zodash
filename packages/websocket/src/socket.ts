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

export interface SocketOptions {
  pingInterval?: number;
  pingTimeout?: number;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('@zodash/websocet');

export class Socket {
  private emitter = new EventEmitter();
  public createdAt = new Date();
  public updatedAt = this.createdAt;

  constructor(
    private readonly socket: ws.Socket,
    private readonly options?: SocketOptions,
  ) {
    this.socket.id = uuid();
    this.socket.isAlive = true;
    this.socket.hasMessageLast10Minutes = false;

    // this.socket.on('pong', () => {
    //   this.socket.isAlive = true;
    // });

    this.socket.on('close', (code, reason) => {
      debug('socket disconnect:', this.id, code, reason);
      this.socket.isAlive = false;

      this.emitter.emit('close', code, reason);
    });

    this.socket.on('error', (error) => {
      // this.socket.isAlive = false;

      this.emitter.emit('error', error);
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
    this.on('close', (code, reason) => {
      // this.disconnect();

      this.emitter.emit('disconnect', code, reason);
    });

    this.on('ping', () => {
      this.socket.isAlive = true;

      this.emit('pong');
    });

    this.emit('id', this.socket.id);
  }

  public get id() {
    return this.socket.id;
  }

  public get isAlive() {
    return this.socket.isAlive;
  }

  // public on(type: 'error', handler: (...args: any[]) => void): void
  // public on(type: 'disconnect', handler: (...args: any[]) => void): void
  public on(type: string, handler: (...args: any[]) => void) {
    this.emitter.on(type, handler);
  }

  public emit(type: string, ...args: any[]) {
    if (type === 'error') {
      return this.socket.send(
        JSON.stringify([
          type,
          {
            message: args[0] instanceof Error ? args[0].message : args[0],
          },
        ]),
      );
    }

    this.socket.send(JSON.stringify([type, ...args]));
  }

  // 手动调用，一定是正常关闭
  public disconnect() {
    // return this.socket.terminate();
    this.socket.close(1000, 'server disconnect normal');
  }

  private ping() {
    return this.socket.ping();
  }
}
