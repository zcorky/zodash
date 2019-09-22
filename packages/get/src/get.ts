import { toPath } from '@zodash/to-path';

/**
 * Get the value at path of object.
 * If the resolved values is undefined, the defaultValue is returnted in its place.
 * 
 * @param value The object to query.
 * @param path The path of the property to get.
 * @param defaultValue The value returned for undefined resolved values.
 */
export function get<T extends object, D>(value: T, path: string, defaultValue: D = undefined): D {
  return toPath(path)
    .reduce((p, k) => {
      if (p && typeof p[k] !== 'undefined') {
        return p[k];
      }

      return defaultValue;
    }, value);
}