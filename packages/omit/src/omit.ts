import { pick } from '@zodash/pick';

/**
 * omit a blacklist of key from object.
 */
export function omit<T extends object, K extends keyof T>(
  value: T,
  keys: K[],
): Omit<T, K> {
  const pickedKeys = Object.keys(value).filter(
    (k) => keys.indexOf((k as any) as K) === -1,
  );

  return pick(value, pickedKeys as any);
}
