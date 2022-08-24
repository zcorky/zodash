import Emitter, { IEmitter } from '@zodash/emitter';
import { memoize } from '@zodash/memoize';

import Logger from './services/logger';
import Cache from './services/cache';
import Storage from './services/storage';
import Http from './services/http';

export type IListener = (...args: any[]) => void;

export interface IEvents {
  error(error: Error): void;
  ready(): void;
  close(): void;
  data(data: object): void;
  message(message: { type: string; content: any }): void;
}

export interface ISDK extends IEmitter<IEvents> {
  ready(fn?: IListener): Promise<any>;
  close(): Promise<void>;
}

const instance = memoize(
  (_name: string, constructor: any, ...args: any[]) =>
    new constructor(...args),
  (name) => name,
);
export abstract class SDK extends Emitter<IEvents> implements ISDK {
  private _isReady = false;

  public get isReady() {
    return this._isReady;
  }

  // utils
  public get logger() {
    return instance('logger', Logger, 'core');
  }

  public get cache() {
    return instance('cache', Cache, 1e6);
  }

  public get storage() {
    return instance('storage', Storage);
  }

  // @TODO
  public get http() {
    return Http; // instance('storage', Storage);
  }

  //
  public ready(fn?: IListener) {
    return new Promise<void>((resolve, reject) => {
      const onReady = (data?: any) => {
        try {
          this._isReady = true;

          fn && fn.call(null, data);

          resolve(data);
        } catch (error) {
          reject(error);
        } finally {
          this.off('ready', onReady);
        }
      };

      this.on('ready', onReady);
    });
  }

  public close() {
    this.emit('close');

    return Promise.resolve();
  }

  // functions
  //  auth
  //  user
}

export default SDK;
