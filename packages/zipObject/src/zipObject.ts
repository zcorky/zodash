/**
 * Creates an array of grouped elements, the first of which contains the first elements of the given arrays, the second of which contains the second elements of the given arrays, and so on.
 *
 * @param args any[][]
 */
export function zipObject(keys: string[], values: any[]) {
  return keys.reduce(
    (all, key, index) => ((all[key] = values[index]), all),
    {}
  );
}
