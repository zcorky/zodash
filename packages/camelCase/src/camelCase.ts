import { capitalize } from '@zodash/capitalize';

const camelCasePatten = '([A-Z]?[a-z]+)';
const lowerCasePattern = '([a-zA-Z]+)';

const pattern = new RegExp(`${camelCasePatten}|${lowerCasePattern}`, 'g');

function words(value: string) {
  return value.match(pattern);
}

export function camelCase(value: string) {
  return words(value).reduce((result, word, index) => {
    const lower = word.toLowerCase();
    return result + (index ? capitalize(lower) : lower);
  }, '');
}