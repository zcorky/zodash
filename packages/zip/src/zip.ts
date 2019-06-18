
/**
 * Creates an array of grouped elements, the first of which contains the first elements of the given arrays, the second of which contains the second elements of the given arrays, and so on.
 * 
 * @param args any[][]
 */
export function zip(...args: any[][]) {
  const len = Math.max(...args.map(e => e.length));

  return args.reduce((all, one, index) => {
    for (let i = 0; i < len; i++) {
      if (!all[i]) {
        all[i] = [];
      }

      all[i][index] = one[i];
    }

    return all;
  }, []);
}