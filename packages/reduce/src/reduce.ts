
/**
 * Reduce an list of values to into a single value
 * 
 * @param value Array of value
 * @param fn Reduce function
 * @param initailValue InitialValue
 */
export function reduce<T, R = any>(value: T[], fn: (previous: R, current: T, index: number, origin: T[]) => R, initailValue: R) {
  return value.reduce(fn, initailValue);
}