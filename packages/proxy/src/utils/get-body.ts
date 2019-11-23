import { Headers } from './interface';
import { stringify } from '@zcorky/query-string';

export const getBody = (body: object, method: string, headers: Headers) => {
  if (['GET', 'HEAD'].indexOf(method) !== -1) {
    return undefined;
  }

  const ContentType = headers && headers['Content-Type'] || ''; // @TODO
  if (ContentType.indexOf('application/x-www-form-urlencoded') !== -1) {
    return stringify(body as any);
  }

  if (typeof body === 'string') {
    return body;
  }

  return JSON.stringify(body);
}
