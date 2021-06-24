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

export function signature(data: IData, secret: string) {
  const _method = data.method.toUpperCase();
  const _url = data.url;
  const _query =
    typeof data.query === 'string'
      ? data.query
      : qs.stringify(data.query as any);
  const _payload = data.payload || '';
  const _timestamp = data.timestamp;

  const _payloadHash =
    typeof _payload === 'string'
      ? sha512(_payload)
      : sha512(JSON.stringify(_payload));

  const _data = [_method, _url, _query, _payloadHash, _timestamp];
  const text = _data.join('\n');
  return hmacSHA512(text, secret);
}
