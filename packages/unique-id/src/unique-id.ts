let id = 0;

export function uniqueId(prefix = '') {
  return `${prefix}${id++}`;
}
