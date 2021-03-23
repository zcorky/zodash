/**
 * Create an object composed of the picked `object` properties.
 *
 * @param value the source object.
 * @param keys the property keys to pick.
 * @returns the new object.
 */
export function pick<T extends object, K extends keyof T>(
  value: T,
  keys: K[],
): Pick<T, K> {
  return keys.reduce((p, k) => {
    if (k in value) {
      p[k] = value[k];
    }

    return p;
  }, {} as any);
}
