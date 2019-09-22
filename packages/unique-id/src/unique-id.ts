let id = 0;

export function uniqueId(prefix: string = '') {
  return `${prefix}${id++}`;
}