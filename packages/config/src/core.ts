import Cache from '@zodash/cache';

export interface IConfig<D extends object> {
  load(fn: () => Promise<D>): Promise<void>;
  get<K extends keyof D>(key: K): D[K];
  set<K extends keyof D>(key: K, value: D[K]): void;
}

export class Config<D extends object> implements IConfig<D> {
  private store = new Cache();

  public static create<K = string, V = any>() {
    return new Cache<K, V>();
  }

  public async load(fn: () => Promise<D>) {
    const data = await fn();

    Object.keys(data).forEach((key) => {
      this.set(key as any, data[key]);
    });
  }

  public loadSync(fn: () => D) {
    const data = fn();

    Object.keys(data).forEach((key) => {
      this.set(key as any, data[key]);
    });
  }

  public set = <K extends keyof D>(key: K, value: D[K]) => {
    this.store.set(key as any, value);
  };

  public get = <K extends keyof D>(name: K): D[K] | undefined => {
    return this.store.get(name as any);
  };
}

export default Config;
