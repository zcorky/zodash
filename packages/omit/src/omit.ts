import { pick } from '@zodash/pick';

export function omit<T extends object>(value: T, keys: string[]) {
  const pickedKeys = Object
    .keys(value)
    .filter(k => keys.indexOf(k) === -1);

  return pick(value, pickedKeys);
}