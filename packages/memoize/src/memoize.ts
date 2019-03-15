export function memoize(fn: (...args: any[]) => any, resolver: (...args: any[]) => string) {
  const memoized = function(...args: any[]) {
    const key = resolver.apply(this, args);
    const cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    memoized.cache.set(key, result);
    return memoized;
  }

  memoized.cache = new memoize.Cache();
  
  return memoized;
}

memoize.Cache = Map;