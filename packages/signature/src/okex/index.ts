import { hmacSHA256 } from '@zodash/hmac';
import * as qs from '@zcorky/query-string';

export interface IData {
  method: 'GET' | 'POST' | string; // GET | POST
  path: string;
  body?: object;
  timestamp: number;
}

export function sign(data: IData, secret: string) {
  const timestamp = new Date(data.timestamp).toISOString();
  const method = data.method.toUpperCase();
  const path = data.path;
  const body =
    method === 'GET' ? '' : stringify(data.body, qs.stringify as any);

  const text = [timestamp, method, path, body].join('');

  return hmacSHA256(text, secret);
}

function stringify(
  v: string | object | null | undefined,
  stringifyFn: (value: object) => string,
) {
  if (!v) return '';
  if (typeof v === 'string') return v;
  return stringifyFn(v);
}

export default sign;
