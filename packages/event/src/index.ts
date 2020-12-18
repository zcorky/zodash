import { once } from '@zodash/once';

export type Arguments<T> = [T] extends [(...args: infer U) => any]
  ? U
  : [T] extends [void] ? [] : [T]

export type Listener = any; // T extends any ? (...args: any[]) => void : T;

export interface IEvent<Events> {
  on<E extends keyof Events>(event: E, listener: Events[E]): this;
  off<E extends keyof Events>(event: E, listener: Events[E]): this;
  addListener<E extends keyof Events>(event: E, listener: Events[E]): this;
  removeListener<E extends keyof Events>(event: E, listener: Events[E]): this;
  removeAllListeners<E extends keyof Events>(event: E): this;
  emit<E extends keyof Events>(event: E, ...args: Arguments<Events[E]>): boolean;
  once<E extends keyof Events>(event: E, listener: Events[E]): this;
  listeners: Record<keyof Events, Listener[]>;
}

const LISTENERS = Symbol('listeners');

export class Event<Events = any> implements IEvent<Events> {
  private [LISTENERS]: Record<keyof Events, Listener[]> = {} as any;

  public get listeners() {
    return this[LISTENERS];
  }

  public on<E extends keyof Events>(event: E, listener: Events[E]) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(listener);
    return this;
  }

  public off<E extends keyof Events>(event: E, listener: Events[E]) {
    if (this.listeners[event]) {
      const all = this.listeners[event];
      all.splice(all.indexOf(listener), 1);
    }

    return this;
  }

  public once<E extends keyof Events>(event: E, listener: Events[E]) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(once(listener as any));
    return this;
  }

  public emit<E extends keyof Events>(event: E, ...args: Arguments<Events[E]>) {
    if (this.listeners[event]) {
      const partListeners = this.listeners[event];
      partListeners.forEach(listener => {
        listener.apply(this, args);
      });
    }

    return false;
  }

  public addListener<E extends keyof Events>(event: E, listener: Events[E]) {
    return this.on(event, listener);
  }

  public removeListener<E extends keyof Events>(event: E, listener: Events[E]) {
    return this.off(event, listener);
  }

  public removeAllListeners<E extends keyof Events>(event: E) {
    if (this.listeners[event]) {
      delete this.listeners[event];
    }

    return this;
  }
}