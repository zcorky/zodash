import sha512 from '@zodash/sha512';
import { hmacSHA512 } from '@zodash/hmac';
import * as qs from '@zcorky/query-string';

export interface IData {
  method: string;
  url: string;
  query: string | object | null;
  payload: string | object | null;
  timestamp: number;
}

export function sign(data: IData, secret: string) {
  const _method = data.method.toUpperCase();
  const _url = data.url;
  const _query = stringify(data.query, qs.stringify as any);
  const _payload = stringify(data.payload, JSON.stringify);
  const _timestamp = data.timestamp;

  // sha512 hash body
  const _payloadHash = sha512(_payload);
  // specify sort
  const _data = [_method, _url, _query, _payloadHash, _timestamp];
  // join with \n
  const text = _data.join('\n');
  // hmac sha512
  return hmacSHA512(text, secret);
}

function stringify(
  v: string | object | null | undefined,
  stringifyFn: (value: object) => string,
) {
  if (!v) return '';
  if (typeof v === 'string') return v;
  return stringifyFn(v);
}

export interface IWSEventData {
  channel: string;
  event: string;
  time: number;
}

export function signWs(data: IWSEventData, secret: string) {
  const text = qs.stringify(data as any);
  return hmacSHA512(text, secret);
}

const _sign: typeof sign & {
  ws?: typeof signWs;
} = sign;

_sign.ws = signWs;

export default _sign;
