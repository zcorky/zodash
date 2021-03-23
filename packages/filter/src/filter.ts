/**
 * filter an list of values to into a single value
 *
 * @param value Array of value
 * @param fn filter function
 * @param initailValue InitialValue
 */
export function filter<T, R = any>(
  value: T[],
  fn: (current: T, index: number, origin: T[]) => R,
) {
  return value.filter(fn);
}
