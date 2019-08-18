export interface IMicrohub<S> {
  register(name: string, service: S): void;
  discover(name: string): S | undefined;
  // on(event: 'register' | 'discover'): void;
  // of(event: 'register' | 'discover'): void;
}

export class Microhub<S> implements IMicrohub<S> {
  private store: Map<string, S> = new Map<string, S>();

  public register(name: string, service: S) {
    this.store.set(name, service);
  }

  public discover(name: string): S {
    return this.store.get(name);
  }
}

export function createMicrohub<S>() {
  return new Microhub<S>();
}