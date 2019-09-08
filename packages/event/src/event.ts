import { once } from '@zodash/once';

export type Listener = (...args: any[]) => void;

export interface IEvent {
  on(event: string, listener: Listener): this;
  off(event: string, listener: Listener): this;
  addListener(event: string, listener: Listener): this;
  removeListener(event: string, listener: Listener): this;
  removeAllListeners(event: string): this;
  emit(event: string, ...args: any[]): boolean;
  once(event: string, listener: Listener): this;
  listeners: Record<string, Listener[]>;
}

const LISTENERS = Symbol('listeners');

export class Event implements IEvent {
  private [LISTENERS]: Record<string, Listener[]> = {};

  public get listeners() {
    return this[LISTENERS];
  }

  public on(event: string, listener: Listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(listener);
    return this;
  }

  public off(event: string, listener: Listener) {
    if (this.listeners[event]) {
      const all = this.listeners[event];
      all.splice(all.indexOf(listener), 1);
    }

    return this;
  }

  public once(event: string, listener: Listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(once(listener));
    return this;
  }

  public emit(event: string, ...args: any[]) {
    if (this.listeners[event]) {
      const partListeners = this.listeners[event];
      partListeners.forEach(listener => {
        listener.apply(this, args);
      });
    }

    return false;
  }

  public addListener(event: string, listener: Listener) {
    return this.on(event, listener);
  }

  public removeListener(event: string, listener: Listener) {
    return this.off(event, listener);
  }

  public removeAllListeners(event: string) {
    if (this.listeners[event]) {
      delete this.listeners[event];
    }

    return this;
  }
}
