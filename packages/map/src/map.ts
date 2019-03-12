/**
 * Produces a new array of values by mapping each value in list through a transformation function.
 * 
 * @param value - Array value to map
 * @param fn - Transformation function
 * @returns A new array of transformed value
 */
export function map<T, R = any>(value: T[], fn: (v: T) => R) {
  return value.map(fn);
}