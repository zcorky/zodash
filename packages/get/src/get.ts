import { toPath } from '@zodash/to-path';
import { undefined as isUndef, array as isArray } from '@zcorky/is';

/**
 * Get the value at path of object.
 * If the resolved values is undefined, the defaultValue is returnted in its place.
 *
 * @param value The object to query.
 * @param path The path of the property to get.
 * @param defaultValue The value returned for undefined resolved values.
 */
export function get<T extends object, D = any>(
  value: T,
  path: string,
  defaultValue: D = undefined,
): D {
  // return toPath(path)
  //   .reduce((p, k) => {
  //     if (p && typeof p[k] !== 'undefined') {
  //       return p[k];
  //     }

  //     return defaultValue;
  //   }, value);
  const _v = getValue(value, toPath(path));

  return !isUndef(_v) ? _v : defaultValue;
}

export function getValue(
  parent: object | object[],
  paths: string[],
  currentIndex = 0,
) {
  if (isUndef(parent)) return undefined;

  const token = paths[currentIndex];
  const nextToken = paths[currentIndex + 1];

  // object
  if (token !== '[]') {
    if (isUndef(nextToken)) {
      return parent[token];
    }

    return getValue(parent[token], paths, currentIndex + 1);
  }

  // array
  if (!isArray(parent)) {
    return undefined;
  }

  if (isUndef(nextToken)) {
    return parent;
  }

  return (parent as any).map((v: any) => getValue(v, paths, currentIndex + 1));
}
