/**
 * Transform path string to path array
 *
 * @param pathString path string
 * @returns path array
 *
 * @example
 *
 * toPath('a.b.c')
 * // => ['a', 'b', 'c']
 *
 * toPath('a[0].b.c')
 * // => ['a', '0', 'b', 'c']
 *
 * toPath('a.0.b.c')
 * // => ['a', '0', 'b', 'c']
 *
 * toPath('a[].b.c')
 * // => ['a', '[]', 'b', 'c']
 */
export function toPath(pathString: string) {
  if (!pathString) return [];

  return pathString
    .replace(/\[(\w+)\]/g, '.$1')
    .replace(/(\[\])/g, '.$1')
    .split('.');
}
