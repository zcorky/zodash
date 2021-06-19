import * as ws from 'ws';
import { EventEmitter } from 'events';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('@zodash/websocet');

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
