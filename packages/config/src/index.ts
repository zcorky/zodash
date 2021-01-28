import Cache from '@zodash/cache';

export interface IConfig<D extends object, K extends keyof D> {
  load(fn: () => Promise<D>): Promise<void>;
  get(key: K): D[K];
  set(key: K, value: D[K]): void;
}

export class Config<D extends object, K extends keyof D> implements IConfig<D, K> {
  private store = new Cache<K, D[K]>();

  public static create<K = string, V = any>() {
    return new Cache<K, V>();
  }

  public async load(fn: () => Promise<D>) {
    const data = await fn();

    Object.keys(data).forEach(key => {
      this.set(key as any, data[key]);
    });
  }

  public set = (key: K, value: D[K]) => {
    this.store.set(key, value);
  }

  public get = (name: K): D[K] | undefined => {
    return this.store.get(name);
  }
}

export default Config;
