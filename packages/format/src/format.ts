import { get } from '@zodash/get';

export interface Seperator {
  start: string;
  end: string;
}

const DEFAULT_SEPERATOR: Seperator = {
  start: '{',
  end: '}',
};

export interface FormatOptions {
  seperator?: Seperator;
  default?: string;
}

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
export function format(
  text: string,
  mapOrFn: Record<string, any> | ((key: string, text: string) => any),
  options?: FormatOptions,
) {
  const seperator = options?.seperator ?? DEFAULT_SEPERATOR;
  const defaultValue = options?.default || '';

  // /users/:id/profile
  if (text.indexOf('/:') != -1) {
    return formatUrl(text, mapOrFn);
  }

  const seperatorStart = seperator.start;
  const SeperatorEnd = seperator.end;
  const pattern = new RegExp(
    `${seperatorStart}([^${SeperatorEnd}]+)${SeperatorEnd}`,
    'g',
  );

  if (typeof mapOrFn === 'function') {
    return text.replace(pattern, (_, key) => mapOrFn(key, text));
  }

  return text.replace(pattern, (_, key) => get(mapOrFn, key, defaultValue));
}

export function formatUrl(
  urlTemplate: string,
  mapOrFn: Record<string, any> | ((key: string, text: string) => any),
) {
  if (typeof mapOrFn === 'function') {
    return urlTemplate.replace(/:([^/]+)/g, (_, key) =>
      mapOrFn(key, urlTemplate),
    );
  }

  return urlTemplate.replace(/:([^/]+)/g, (_, key) => get(mapOrFn, key));
}
