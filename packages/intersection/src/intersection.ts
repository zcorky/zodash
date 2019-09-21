/**
 * Creates an array of unique values that are included in all given arrays.
 * 
 * @param by (optional)
 * @param arrays array of array
 */
export function intersection<T>(by: (value: T) => string, ...arrays: T[][]): T[]
export function intersection<T>(...arrays: T[][]): T[]
export function intersection<T>(by: any, ...arrays: T[][]) {
  const isFn = typeof by === 'function';
  const _by = isFn ? by : undefined;
  const _arrays = isFn ? arrays : [by, ...arrays] as T[][];

  // @TODO
  const _arrayMap = (_arrays[0] || []).reduce((all, value) => {
    const key = isFn ? _by(value) : value as any as string; 
    all[key] = value;
    return all;
  }, {} as { [key: string]: T });
  
  const mapArray = _arrays.map(array => {
    const _map = array.reduce((all, value) => {
      const key = isFn ? _by(value) : value as any as string; 
      all[key] = 1;
      return all;
    }, {} as { [key: string]: number });
    return _map;
  });

  return Object
    .keys(_arrayMap).filter(key => {
      return mapArray.every(map => map[key] === 1);
    })
    .map(key => _arrayMap[key]);
}