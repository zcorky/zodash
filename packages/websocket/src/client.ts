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

  /**
   * Auto Reconnect if close is not normally, default: true
   */
  autoReconnect?: boolean;

  /**
   * Auto Reconnect Delay in milliseconds, default: 5000
   */
  autoReconnectDelay?: number;

  /**
   * Max Auto Reconnect Times, default: 1440
   *
   *  if cannot connect after reconnect 1440 times (2h, when autoReconnectDelay = 5000),
   *    which may be mean your server is gone
   */
  maxAutoReconnectTimes?: number;
}

export class Client {
  private emitter = new EventEmitter();
  private readonly socket: ws;

  public id: string;
  public isAlive: boolean;
  public createdAt = new Date();
  public updatedAt = this.createdAt;
  //
  private socketOptions: SocketOptions;
  private pingInterval = this.options?.pingInterval ?? 15000;
  private pingTimeout = this.options?.pingTimeout ?? 5000;
  private autoReconnectDelay = this.options?.autoReconnectDelay ?? 5000;
  private autoReconnect = this.options?.autoReconnect ?? true;
  private maxAutoReconnectTimes = this.options?.maxAutoReconnectTimes ?? 1440;

  private $pingInterval: NodeJS.Timeout;
  private $pingTimeout: NodeJS.Timeout;
  private $echoInterval: NodeJS.Timeout;
  private $currentAutoReconnectTimes = 0;

  constructor(
    private readonly url: string,
    private readonly options?: ClientOptions,
  ) {
    this.connect();
  }

  public on(type: string, handler: (...args: any[]) => void) {
    this.emitter.on(type, handler);
  }

  public off(type: string, handler: (...args: any[]) => void) {
    this.emitter.off(type, handler);
  }

  public emit(type: string, ...args: any[]) {
    this.socket.send(JSON.stringify([type, ...args]));
  }

  public disconnect() {
    // return this.socket.terminate();
    return this.socket.close(1000, 'client disconnect normal');
  }

  public connect() {
    //
    (this as any).socket = new ws(this.url);
    this.listen();

    // this.socket.on('pong', () => {
    //   this.socket.isAlive = true;
    // });

    this.socket.on('close', (code, reason) => {
      this.isAlive = false;

      this.emitter.emit('close', code, reason);
    });

    this.socket.on('error', (error) => {
      this.emitter.emit('error', error);
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

    this.socket.on('message', (message) => {
      try {
        const structedMessage = safeJSONParse(
          message as any as string,
        ) as any as [string, any];
        // const [type, payload = '']
        const type = structedMessage[0];
        const payload = structedMessage[1];

        if (typeof type === 'undefined') {
          throw new Error(
            `unkown ws message format, expected [type, payload], but ${message}`,
          );
        }

        debug('onmessage:', type, payload);

        if (type === 'error') {
          return this.emitter.emit(
            'error',
            new Error(payload?.message ?? 'unknown'),
          );
        }

        this.emitter.emit(type, payload);
      } catch (error) {
        // @TODO
        console.error('error', error);
      }
    });
  }

  public reconnect() {
    debug('reconnect');

    this.emitter.emit('reconnect');

    this.connect();
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
    debug('echo');

    this.$echoInterval = setTimeout(() => {
      this.echo();
    }, 30 * 1000);

    this.emit('echo');
  }

  private listen() {
    const onClose = (code: number, reason: string) => {
      debug('close', 'code:', code, 'reason:', reason);

      removeListeners();
      this.clean();

      //  if not close normal and autoReconnect is true, reconnect
      if (code !== 1000 && this.autoReconnect) {
        debug('auto reconnect ...');

        if (this.$currentAutoReconnectTimes >= this.maxAutoReconnectTimes) {
          this.emitter.emit(
            'error',
            new Error(
              `reached max auto reconnect times (${this.maxAutoReconnectTimes})`,
            ),
          );
          return;
        }

        setTimeout(() => {
          this.$currentAutoReconnectTimes += 1;
          debug(
            'current auto reconect times:',
            this.$currentAutoReconnectTimes,
          );

          this.reconnect();
        }, this.autoReconnectDelay);
      }

      this.emitter.emit('disconnect', code, reason);
    };

    const onConfig = (options: SocketOptions) => {
      this.socketOptions = options;
      //
      this.pingInterval = this.socketOptions.pingInterval ?? 15000;
      this.pingTimeout = this.socketOptions.pingTimeout ?? 5000;
    };

    const onPong = () => {
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
    };

    const onId = (id: string) => {
      debug('receive id:', id);
      this.id = id;

      // @TODO reset auto reconnect times
      this.$currentAutoReconnectTimes = 0;

      // @TODO compatible
      this.emitter.emit('connection');
      this.emitter.emit('connect');
    };

    const addListeners = () => {
      this.on('close', onClose);
      this.on('@@CONFIG', onConfig);
      this.on('pong', onPong);
      this.on('id', onId);
    };

    const removeListeners = () => {
      this.off('close', onClose);
      this.off('@@CONFIG', onConfig);
      this.off('pong', onPong);
      this.off('id', onId);
    };

    addListeners();
  }

  private clean() {
    if (this.$pingInterval) {
      clearTimeout(this.$pingInterval);
      this.$pingInterval = null;
    }

    if (this.$echoInterval) {
      clearTimeout(this.$echoInterval);
      this.$echoInterval = null;
    }
  }
}

function safeJSONParse(text: string) {
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error('unknown ws message format, internal use json');
  }
}
