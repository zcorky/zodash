/**
 * Creates an array of unique values.
 *
 * @param by (optional)
 * @param arrays array of array
 */
export function xor<T>(by: (value: T) => string, ...arrays: T[][]): T[];
export function xor<T>(...arrays: T[][]): T[];
export function xor<T>(by: any, ...arrays: T[][]) {
  const isFn = typeof by === 'function';
  const _by = isFn ? by : undefined;
  const _arrays = isFn ? arrays : ([by, ...arrays] as T[][]);

  const arrayMap = {};

  const mapArray = _arrays.map((array) => {
    const _map = array.reduce((all, value) => {
      const key = isFn ? _by(value) : ((value as any) as string);
      all[key] = 1;
      arrayMap[key] = value;
      return all;
    }, {} as { [key: string]: number });
    return _map;
  });

  const mapCount = mapArray.reduce((all, map) => {
    Object.keys(map).forEach((key) => {
      all[key] = !all[key] ? 1 : all[key] + 1;
    });
    return all;
  }, {} as { [key: string]: number });

  return Object.keys(mapCount)
    .filter((key) => {
      return mapCount[key] === 1;
    })
    .map((key) => arrayMap[key]);
}
