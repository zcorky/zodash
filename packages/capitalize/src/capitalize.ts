/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 * @param {string} string the string to capitalize.
 * @returns {string}
 * @example
 * 
 * capitalize('FRED')
 * // => 'Fred'
 */
export function capitalize(string: string) {
  const firstUpperCase = string.slice(0, 1).toUpperCase();
  const remainLowerCase = string.slice(1).toLowerCase();

  return `${firstUpperCase}${remainLowerCase}`; 
}