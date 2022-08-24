// Youtube Like ID
//  1. Shorten/Compress ID
//  2. Uglify ID
//
// Refrences: https://kvz.io/create-short-ids-with-php-like-youtube-or-tinyurl.html
//  Front: https://www.youtube.com/watch?v=yzNjIBEdyww
//  Backend: v => 18767654987057970000

const dicts =
  'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function encode(id: number): string {
  if (typeof id == 'undefined') return null;
  if (typeof id !== 'number') throw new Error('only allow number');

  const dictsLength = dicts.length;
  let _id = '';
  for (
    let i = Math.floor(Math.log(id) / Math.log(dictsLength));
    i >= 0;
    i--
  ) {
    const start = Math.floor(id / bcpow(dictsLength, i)) % dictsLength;
    _id += dicts[start] || '';
  }

  return stringReverse(_id);
}

export function decode(id: string): number {
  if (typeof id == 'undefined') return null;
  if (typeof id !== 'string') throw new Error('only allow string');

  const dictsLength = dicts.length;
  const _id = stringReverse(id);
  let ret = 0;
  for (let i = 0; i <= _id.length - 1; i++) {
    const key = _id[i] || '';
    const index = dicts.indexOf(key);
    ret += index * bcpow(dictsLength, _id.length - 1 - i);
  }

  return ret;
}

function bcpow(x: number, y: number) {
  return Math.floor(Math.pow(x, y));
}

function stringReverse(str: string) {
  return str.split('').reverse().join('');
}
