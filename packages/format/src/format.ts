/**
 * Format string
 * 
 * @param pattern string pattern.
 * @param map map values
 * @returns the random number between 0 and max
 * 
 * @example
 *  format('Author: {author}, From: {from}', { author: 'Zero', from: 'China' });
 */
export function format(pattern: string, map: Record<string, any>) {
  return pattern.replace(/{([^}]+)}/g, (_, key) => {
    return typeof map[key] !== 'undefined' ? map[key] : '';
  });
}