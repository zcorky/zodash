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

 kebabCase(['foo', 'bar', 'baz'])
 // => 'foo-bar-baz'
 ```
 */
export function kebabCase(value: string | string[]) {
  const _words = !Array.isArray(value) ? words(value) : value;

  return compose(_words);
}

function compose(words: string[]) {
  return words.map((word) => word.toLowerCase()).join('-');
}
