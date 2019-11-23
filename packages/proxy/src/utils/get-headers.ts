import { Headers } from './interface';

export function getHeaders(headers: Headers, extendsHeaders?: Headers) {
  return {
    ...headers,
    ...extendsHeaders,
  };
}