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
 *
 * toPath('SERVICE_CONFIG_ID', '_')
 * // => ['SERVICE', 'CONFIG', 'ID']
 */
export function toPath(pathString: string, separator = '.') {
  if (!pathString) return [];

  return pathString
    .replace(/\[(\w+)\]/g, `${separator}$1`)
    .replace(/(\[\])/g, `${separator}$1`)
    .split(separator);
}
