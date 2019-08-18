export interface IMicrohub {
  register<E>(name: string, entity: E): void;
  discover<E>(name: string): E;
  // on(event: 'register' | 'discover'): void;
  // of(event: 'register' | 'discover'): void;
}

export class Microhub implements IMicrohub {
  private store: Map<string, any> = new Map<string, any>();

  static create<T extends IMicrohub>() {
    return new Microhub() as any as T;
  }

  public register<N extends string, E>(name: N, entity: E) {
    this.store.set(name, entity);
  }

  public discover(name: string): any {
    return this.store.get(name);
  }
}