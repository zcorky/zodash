import { capitalize } from '@zodash/capitalize';

const camelCasePatten = '([A-Z]?[a-z]+)';
const lowerCasePattern = '([a-zA-Z]+)';

const pattern = new RegExp(`${camelCasePatten}|${lowerCasePattern}`, 'g');

function words(value: string) {
  return value.match(pattern);
}

/**
 * Converts a string value into [camel case](https://en.wikipedia.org/wiki/Camel_case).
 * @param value The string to convert.
 * @returns The camel-cased string.
 * @example ```ts
 camelCase('foo-bar-baz')
 // => 'fooBarBaz'

 camelCase(['foo', 'bar', 'baz'])
 // => 'fooBarBaz'
 ```
 */
export function camelCase(value: string | string[]) {
  const _words = !Array.isArray(value) ? words(value) : value;

  return compose(_words);
}

function compose(words: string[]) {
  return words
    .map((word, index) => {
      const _word = word.toLowerCase();
      if (index === 0) {
        return _word;
      }

      return capitalize(_word);
    })
    .join('');
}
