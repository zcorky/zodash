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
  ready(fn?: IListener): Promise<any>;
  close(): Promise<void>;
}

export class SDK extends Emitter implements ISDK {
  private _isReady = false;

  public get isReady() {
    return this._isReady;
  }

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
}

