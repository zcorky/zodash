import * as ws from 'ws';
import { EventEmitter } from 'events';

import { SocketOptions } from './socket';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('@zodash/websocet');

export interface ClientOptions {
  /**
   * Ping Interval, default: 15000
   */
  pingInterval?: number;

  /**
   * Ping Timeout, default: 5000
   */
  pingTimeout?: number;

  /**
   * Auto Echo, default: false
   *
   *  for save server tcp socket, use 10 minites message echo
   */
  autoEcho?: boolean;
}

export class Client {
  private emitter = new EventEmitter();
  private readonly socket = new ws(this.url);

  public id: string;
  public isAlive: boolean;
  public createdAt = new Date();
  public updatedAt = this.createdAt;
  //
  private socketOptions: SocketOptions;
  private pingInterval = this.options?.pingInterval ?? 15000;
  private pingTimeout = this.options?.pingTimeout ?? 5000;

  private $pingInterval: NodeJS.Timeout;
  private $pingTimeout: NodeJS.Timeout;

  constructor(
    private readonly url: string,
    private readonly options?: ClientOptions,
  ) {
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

    this.on('close', (...args) => {
      this.disconnect();

      this.emitter.emit('disconnect', ...args);
    });

    this.on('@@CONFIG', (options: SocketOptions) => {
      this.socketOptions = options;
      //
      this.pingInterval = this.socketOptions.pingInterval ?? 15000;
      this.pingTimeout = this.socketOptions.pingTimeout ?? 5000;
    });

    //
    this.on('pong', () => {
      debug('pong');
      this.isAlive = true;

      // release $pingTimeout
      if (this.$pingTimeout) {
        clearTimeout(this.$pingTimeout);
        this.$pingTimeout = null;
      }

      this.$pingInterval = setTimeout(() => {
        this.ping();
      }, this.pingInterval);
    });

    this.socket.on('open', () => {
      // setup
      //  1. ping => alive
      this.ping();

      if (this.options?.autoEcho) {
        //  2. echo => 10 minite message communication
        this.echo();
      }
    });

    this.on('id', (id) => {
      debug('receive id:', id);
      this.id = id;

      this.emitter.emit('connection');
    });

    this.socket.on('message', (message) => {
      const [type, payload = ''] = JSON.parse(message as any as string);
      debug('onmessage:', type, payload);

      if (type === 'error') {
        return this.emitter.emit(
          'error',
          new Error(payload?.message ?? 'unknown'),
        );
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
    if (this.$pingInterval) {
      clearTimeout(this.$pingInterval);
      this.$pingInterval = null;
    }

    return this.socket.terminate();
  }

  private ping() {
    debug('ping');

    // if no response when timeout, stop ping
    this.$pingTimeout = setTimeout(() => {
      if (this.$pingInterval) {
        clearTimeout(this.$pingInterval);
        this.$pingInterval = null;
      }
    }, this.pingTimeout);

    return this.emit('ping');
  }

  private echo() {
    setTimeout(() => {
      this.echo();
    }, 30 * 1000);

    this.emit('echo');
  }
}
