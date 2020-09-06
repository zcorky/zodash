import { lru as LRU } from '@zcorky/lru';
import { get } from '@zodash/get';

export function cache(maxAge: number)
export function cache(key: string, maxAge?: number)
export function cache(key: () => string, maxAge?: number)
export function cache(key: any, maxAge?: any) {
  const _cache = new LRU<string, any>();
  const cacheOptions = typeof key === 'number'
    ? { maxAge: key }
    : maxAge ? { maxAge } : undefined;

  return <T>(target: any, propertyKey: PropertyKey, descriptor: TypedPropertyDescriptor<T>) => {
    const method = descriptor.value as any as Function;
    
    descriptor.value = async function (...args: any[]) {
      let cachedKey: string;
      
      if (typeof key === 'string') {
        // context key
        cachedKey = get(this, key);
      } else if (typeof key === 'function') {
        // context function
        cachedKey = key.apply(this, args);
      } else if (typeof key === 'number') {
        // use parameters as cachedKey
        cachedKey = JSON.stringify(args);
      }
      

      const cachedValue = _cache.get(cachedKey, cacheOptions);
      if (cachedValue) {
        return cachedValue;
      }
      
      const value = await method.apply(this, args);
      _cache.set(cachedKey, value);

      return value;
    } as any;

    return descriptor;
  };
}