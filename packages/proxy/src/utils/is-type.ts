import { is } from 'type-is';

export function isJSON(contentType: string) {
  return is(contentType, 'json') === 'json';
}

export function isText(contextType: string) {
  return !!is(contextType, ['text', 'html', 'css']);
}