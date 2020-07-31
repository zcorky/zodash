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
export function format(text: string, mapOrFn: Record<string, any> | ((key: string, text: string) => any), seperator: Seperator = DEFAULT_SEPERATOR) {
  const seperatorStart = seperator.start;
  const SeperatorEnd = seperator.end;
  const pattern = new RegExp(`${seperatorStart}([^${SeperatorEnd}]+)${SeperatorEnd}`, 'g');

  if (typeof mapOrFn === 'function') {
    return text.replace(pattern, (_, key) => {
      return mapOrFn(key, text);
    });
  }

  return text.replace(pattern, (_, key) => {
    return typeof mapOrFn[key] !== 'undefined' ? mapOrFn[key] : '';
  });
}