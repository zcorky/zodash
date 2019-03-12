/**
 * Get the value at path of object.
 * If the resolved values is undefined, the defaultValue is returnted in its place.
 * 
 * @param value The object to query.
 * @param path The path of the property to get.
 * @param defaultValue The value returned for undefined resolved values.
 */
export function get<T extends object, D>(value: T, path: string, defaultValue: D = null): D {
  return path
    .split('.')
    .reduce((p, k) => {
      if (p && p[k]) {
        return p[k];
      }

      return defaultValue;
    }, value);
}