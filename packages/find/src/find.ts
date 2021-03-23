/**
 * find an object from a list
 *
 * @param list value list
 * @param fn find function
 */
export function find<T>(
  list: T[],
  fn: (one: T, index: number, originList: T[]) => boolean,
) {
  return list.find(fn);
}
