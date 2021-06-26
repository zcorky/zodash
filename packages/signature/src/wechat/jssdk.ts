import sha1 from '@zodash/sha1';

export interface IData {
  url: string;
  jsapi_ticket: string;
  noncestr: string;
  timestamp: number;
}

export function sign(data: IData) {
  // 1. 按照字段名的ASCII 码从小到大排序（字典序）
  const _data = [
    'url',
    'jsapi_ticket',
    'noncestr',
    'timestamp',
  ].sort((a, b) => a.localeCompare(b));
  const paris = _data.map((key) => [key, data[key]]);
  const text = paris.map(([key, value]) => `${key}=${value}`).join('&');
  // 2. sha1
  return sha1(text);
}
