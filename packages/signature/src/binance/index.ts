import { hmacSHA256 } from '@zodash/hmac';
import * as qs from '@zcorky/query-string';

export interface IData {
  query?: object;
  body?: object;
}

export interface D {
  symbol: string;
  side: string;
  type: string;
  timeInForce: string;
  quantity: number | string;
  price: number | string;
  recvWindow: number | string;
  timestamp: number;
}

export function signature(data: IData, secret: string) {
  const query = omitUndefined(data.query);
  const queryText = stringify(query, qs.stringify);

  const body = omitUndefined(data.body);
  const bodyText = stringify(body, qs.stringify);

  const text = [queryText, bodyText].join('');
  // hmac sha512
  return hmacSHA256(text, secret);
}

function omitUndefined(data?: object) {
  return Object.keys(data || {}).reduce((all, key) => {
    if (typeof data[key] !== 'undefined') {
      all[key] = data[key];
    }

    return all;
  }, {});
}

function stringify(
  v: string | object | null | undefined,
  stringifyFn: (value: object) => string,
) {
  if (!v) return '';
  if (typeof v === 'string') return v;
  return stringifyFn(v);
}
