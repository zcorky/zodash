import { hmacSHA256 } from '@zodash/hmac';
import * as qs from '@zcorky/query-string';

export interface IData {
  method: string;
  path: string;
  query?: string;
  body?: string;
  timestamp: number;
}

export function sign(data: IData, secret: string) {
  const _method = data.method.toUpperCase();
  const _url = data.path;
  const _query = !data.query ? '' : data.query;
  const _payload = !data.body ? '' : data.body;
  const _timestamp = data.timestamp;

  const _data = [_timestamp, _method, _url, _query, _payload];
  const text = _data.join('');
  // console.log('sign text:', text);
  return hmacSHA256(text, secret);
}

// function stringify(
//   v: string | object | null | undefined,
//   stringifyFn: (value: object) => string,
// ) {
//   if (!v) return '';
//   if (typeof v === 'string') return v;
//   return stringifyFn(v);
// }

export interface IWSEventData {
  timestamp: number;
}

export function signWs(data: IWSEventData, secret: string) {
  const text = `${data.timestamp}websocket_login`;
  return hmacSHA256(text, secret);
}

const _sign: typeof sign & {
  ws?: typeof signWs;
} = sign;

_sign.ws = signWs;

export default _sign;
