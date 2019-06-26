const camelCasePattern = '([A-Z]?[a-z]+)';
const snakeCasePattern = '([a-zA-Z]+)';

const pattern = new RegExp(`${camelCasePattern}|${snakeCasePattern}`, 'g');

function words(value: string) {
  return value.match(pattern);
}

export function snakeCase(value: string) {
  return words(value)
    .map(word => word.toLowerCase())
    .join('-');
}