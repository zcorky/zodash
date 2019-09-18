export interface Seperator {
  start: string;
  end: string;
}

const DEFAULT_SEPERATOR: Seperator = {
  start: '{',
  end: '}'
};

/**
 * Format string
 * 
 * @param text string text.
 * @param map map values
 * @param seperator optional, {start, end}
 * @returns the random number between 0 and max
 * 
 * @example
 *  format('Author: {author}, From: {from}', { author: 'Zero', from: 'China' });
 */
export function format(text: string, map: Record<string, any>, seperator: Seperator = DEFAULT_SEPERATOR) {
  const seperatorStart = seperator.start;
  const SeperatorEnd = seperator.end;
  const pattern = new RegExp(`${seperatorStart}([^${SeperatorEnd}]+)${SeperatorEnd}`, 'g');

  return text.replace(pattern, (_, key) => {
    return typeof map[key] !== 'undefined' ? map[key] : '';
  });
}