import { capitalize } from "../../capitalize/src/capitalize";

const pattern = /([a-zA-Z]+)/g;

function words(value: string) {
  return value.match(pattern);
}

export function camelCase(value: string) {
  return words(value).reduce((result, word, index) => {
    const lower = word.toLowerCase();
    return result + (index ? capitalize(lower) : lower);
  }, '');
}