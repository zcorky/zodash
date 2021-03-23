/**
 * Creates an array of unique values, in order, from all given arrays.
 *
 * @param by (optional) by function
 * @param arrays array of array
 */
export function union<T>(by: (value: T) => string, ...arrays: T[][]): T[];
export function union<T>(...arrays: T[][]): T[];
export function union<T>(by: any, ...arrays: T[][]) {
  const isFn = typeof by === 'function';
  const _by = isFn ? by : undefined;
  const _arrays = isFn ? arrays : ([by, ...arrays] as T[][]);

  const map = _arrays.reduce((_map, array) => {
    const __map = array.reduce((all, value) => {
      const key = isFn ? _by(value) : ((value as any) as string);
      all[key] = value;
      return all;
    }, _map);
    return __map;
  }, {} as { [key: string]: T });

  return Object.values(map);
}
