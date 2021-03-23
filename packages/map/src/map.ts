/**
 * Produces a new array of values by mapping each value in list through a transformation function.
 *
 * @param value - Array Or Object
 * @param fn - Transformation function
 * @returns A new array of transformed value
 */
export function map<T = any, R = any>(
  value: T[],
  fn: (value: T, index: number, array: T[]) => R
): R[];
export function map<T extends object, R = any>(
  value: T,
  fn: <K extends keyof T>(
    value: [K, T[K]],
    index: number,
    obj: [K, T[K]][]
  ) => R
): R[];
export function map(
  value: any,
  fn: (value: any, index: number, array: any[]) => any
) {
  if (Array.isArray(value)) {
    return value.map(fn);
  }

  return entries(value).map(fn);
}

function entries(obj: object) {
  if (Object.entries) {
    return Object.entries(obj);
  }

  return Object.keys(obj).map((key) => [key, obj[key]]);
}
