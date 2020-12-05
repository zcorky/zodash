import Cache from '@zodash/cache';

export interface IContainer<K = string, V = any> {
  register(name: K, value: V): void;
  get(name: K): V | undefined;
}

export class Container<K = string, V = any> implements IContainer<K, V> {
  private store = new Cache<K, V>();

  public static create<K = string, V = any>() {
    return new Cache<K, V>();
  }

  public register(name: K, value: V) {
    const { store } = this;

    if (store.hasKey(name)) {
      throw new Error(`You should not register the same name ${name}`);
    }

    this.store.set(name, value);
  }

  public get(name: K): V | undefined {
    return this.store.get(name);
  }
}

export default Container;
