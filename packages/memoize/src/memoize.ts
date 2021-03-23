export function memoize<T extends any[], R>(
  fn: (...args: T) => R,
  resolver: (...args: T) => string,
) {
  const memoized = function (...args: T): R {
    const key = resolver.apply(this, args);
    const { cache } = memoized;

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    memoized.cache.set(key, result);
    return (memoized as any) as R;
  };

  memoized.cache = new memoize.Cache();

  return memoized;
}

memoize.Cache = Map;
