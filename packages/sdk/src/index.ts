import Emitter, { IEmitter } from '@zodash/emitter';

export type IListener = (...args: any[]) => void

export interface ISDK extends IEmitter {
  on(event: 'error', fn: (error: Error) => void): this;
  on(event: 'ready', fn: IListener): this;
  on(event: 'close', fn: IListener): this;
  //
  on(event: 'data', fn: <T>(data: T) => void): this;
  on(event: 'message', fn: <T>(message: T) => void): this;
  //
  ready(fn: IListener): Promise<void>;
  close(): Promise<void>;
}

export class SDK extends Emitter implements ISDK {
  private _isReady = false;
  private _readyCallback: IListener;

  public get isReady() {
    return this._isReady;
  }

  public ready(fn: IListener) {
    this._readyCallback = fn;

    return new Promise<void>((resolve, reject) => {
      this.on('ready', () => {
        try {
          this._readyCallback();

          this._isReady = true;

          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  public close() {
    this.emit('close');

    return Promise.resolve();
  }
}

