import { hmacSHA256 } from '@zodash/hmac';
import * as qs from '@zcorky/query-string';

export interface IData {
  /**
   * query
   */
  query?: object;

  /**
   * body
   */
  body?: object;

  /**
   * ms
   */
  timestamp: number;
}

export function sign(data: IData, secret: string) {
  // 1. alphabet order
  const _query = !data.query
    ? {}
    : Object.keys(data.query)
        .sort((a, b) => a.localeCompare(b))
        .reduce((all, key) => {
          all[key] = data.query[key];
          return all;
        }, {});
  const _body = !data.body
    ? {}
    : Object.keys(data.body)
        .sort((a, b) => a.localeCompare(b))
        .reduce((all, key) => {
          all[key] = data.body[key];
          return all;
        }, {});

  // 2. concat
  const $query = qs.stringify(_query as any);
  const $body = qs.stringify(_body as any);
  //
  const qst = [$query, $body].filter((e) => !!e).join('&');

  // 3. with timestamp
  const text = `${qst}|${data.timestamp}`;
  // console.log('text:', text);

  return hmacSHA256(text, secret);
}

export default sign;
