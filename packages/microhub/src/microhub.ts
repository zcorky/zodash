import { Event as Emitter } from '@zodash/event';

export interface IMicrohub {
  register<E>(name: string, entity: E): void;
  discover<E>(name: string): E;
  //
  on(type: 'register', cb: (d: Data) => void): void;
  on(type: 'discover', cb: (d: Data) => void): void;
}

export interface Data {
  name: string;
  entity: any;
}

export class Microhub extends Emitter implements IMicrohub {
  private store: Map<string, any> = new Map<string, any>();

  static create<T extends IMicrohub>() {
    return (new Microhub() as any) as T;
  }

  public register<N extends string, E>(name: N, entity: E) {
    this.emit('register', { name, entity });

    this.store.set(name, entity);
  }

  public discover(name: string): any {
    const entity = this.store.get(name);

    this.emit('discover', { name, entity });

    return entity;
  }
}

export default Microhub;
