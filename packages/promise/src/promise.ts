import { Event } from '@zodash/event';

export interface IZPromise<T> {
  then(resolver: Resolver): IZPromise<T>;
  catch(rejecter: Rejecter): IZPromise<T>;
  finally(finaler: Finaler): IZPromise<T>;
}

export type Resolver = <T>(value: T) => IZPromise<T> | any;
export type Rejecter = <T extends Error>(error: T) => IZPromise<T> | any;
export type Finaler = () => IZPromise<any> | any;
export type Executor = (resolve: Resolver, reject: Rejecter) => void;

export enum Status {
  PENDING = 'PENDING',
  FULLFILLED = 'FULLFILLED',
  REJECTED = 'REJECTED',
}

export class ZPromise<T> implements IZPromise<T> {
  private status: Status = Status.PENDING;
  private event = new Event();

  public static resolve<T>(value?: T) {
    return new ZPromise(resolve => {
      setTimeout(() => resolve(value), 0);
    });
  }

  public static reject<T extends Error>(error: T) {
    return new ZPromise((resolve, reject) => {
      setTimeout(() => reject(error), 0);
    });
  }

  constructor(private readonly executor: Executor) {
    executor.call(this, this.resolve, this.reject);
  }

  private resolve = (value: any) => {
    this.status = Status.FULLFILLED;

    const resolvers = this.event.listeners['resolve'];
    
    resolvers.reduce((res, next) => {
      // only REJECTED status will break resolve, FULLFILLED wonot
      if (this.status === Status.REJECTED) {
        // @TODO should break
        return ;
      }

      try {
        return next(res) as any;
      } catch (error) {
        return this.reject(error);
      }
    }, value);
  }

  private reject = (error: any) => {
    this.status = Status.REJECTED;

    // const rejecters = this.event.listeners['reject'];

    this.event.emit('reject', error);
  }

  public then(resolver: Resolver) {
    this.event.on('resolve', resolver);
    return this;
  }

  public catch(rejecter: Rejecter) {
    this.event.on('reject', rejecter);
    return this;
  }

  public finally(finaler: Finaler) {
    this.event.on('finally', finaler);
    return this;
  }
}

export default ZPromise;
