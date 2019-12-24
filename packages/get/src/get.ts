import { toPath } from '@zodash/to-path';

/**
 * Get the value at path of object.
 * If the resolved values is undefined, the defaultValue is returnted in its place.
 * 
 * @param value The object to query.
 * @param path The path of the property to get.
 * @param defaultValue The value returned for undefined resolved values.
 */
export function get<T extends object, D = any>(value: T, path: string, defaultValue: D = undefined): D {
  // return toPath(path)
  //   .reduce((p, k) => {
  //     if (p && typeof p[k] !== 'undefined') {
  //       return p[k];
  //     }

  //     return defaultValue;
  //   }, value);
  return getValue(value, toPath(path)) || defaultValue;
}

export function getValue(parent: object | object[], paths: string[], currentIndex: number = 0) {
  if (typeof parent === 'undefined') return undefined;

  const token = paths[currentIndex];
  const prevToken = paths[currentIndex - 1];
  const nextToken = paths[currentIndex + 1];

  // object
  // console.log(prevToken, token, nextToken);
  // console.log(parent);
  // console.log(paths);
  // console.log('####');
  // console.log(parent, typeof parent);
  if (token !== '[]') {
    if (typeof nextToken === 'undefined') {
      return parent[token];
    }

    return getValue(parent[token], paths, currentIndex + 1);
  }
  
  // array
  if (!Array.isArray(parent)) {
    return undefined;
  }

  if (typeof nextToken === 'undefined') {
    return parent;
  }

  return (parent as any).map((v: any) => getValue(v, paths, currentIndex + 1));
}