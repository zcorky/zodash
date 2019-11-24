import { Headers } from '../core/interface';

export function getHeaders(headers: Headers, extendsHeaders?: Headers) {
  return {
    ...headers,
    ...extendsHeaders,
  };
}