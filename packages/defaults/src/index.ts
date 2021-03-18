import { undef as isUndef } from '@zcorky/is';

export function defaults<T = any>(origin: Partial<T>, ...sources: Partial<T>[]): Partial<T> {
  const _origin = { ...origin };

  sources.forEach(source => {
    Object.keys(source).forEach(key => {
      if (isUndef(_origin[key])) {
        _origin[key] = source[key];
      }
    });
  });

  return _origin;
}

export default defaults;
