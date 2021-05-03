const camelCasePattern = '([A-Z]?[a-z]+)';
const lowCaseCasePattern = '([a-zA-Z]+)';

const pattern = new RegExp(`${camelCasePattern}|${lowCaseCasePattern}`, 'g');

function words(value: string) {
  return value.match(pattern);
}

/**
 * Converts a string value into [kebab case](https://en.wikipedia.org/wiki/Kebab_case).
 * @param value The string to convert.
 * @returns The kebab-cased string.
 * @example ```ts
 kebabCase('fooBarBaz')
 // => 'foo-bar-baz'
 ```
 */
export function kebabCase(value: string) {
  return words(value)
    .map((word) => word.toLowerCase())
    .join('-');
}
