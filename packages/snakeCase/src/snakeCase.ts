const camelCasePattern = '([A-Z]?[a-z]+)';
const snakeCasePattern = '([a-zA-Z]+)';

const pattern = new RegExp(`${camelCasePattern}|${snakeCasePattern}`, 'g');

function words(value: string) {
  return value.match(pattern);
}

/**
 * Converts a string value into [snake case](https://en.wikipedia.org/wiki/Snake_case).
 * @param value The string to convert.
 * @returns The snake-cased string.
 * @example ```ts
 * snakeCase('fooBarBaz')
 * // => 'foo_bar_baz'
 * ```
 */
export function snakeCase(value: string) {
  return words(value)
    .map((word) => word.toLowerCase())
    .join('_');
}
