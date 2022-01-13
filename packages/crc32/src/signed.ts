/*
  crc32.js (C) 2014-present SheetJS -- http://sheetjs.com
  reference: https://github.com/SheetJS/js-crc32/blob/master/crc32.js
*/

function signed_crc_table() {
  const table = new Array(256);
  let c = 0;

  for (let n = 0; n != 256; ++n) {
    c = n;
    c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
    c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
    c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
    c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
    c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
    c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
    c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
    c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }

  return typeof Int32Array !== 'undefined' ? new Int32Array(table) : table;
}

const T = signed_crc_table();

export function crc32(str: string, seed = 0) {
  let C = seed ^ -1;
  let c: number;
  let d: number;
  for (let i = 0, L = str.length; i < L; ) {
    c = str.charCodeAt(i++);
    if (c < 0x80) {
      C = (C >>> 8) ^ T[(C ^ c) & 0xff];
    } else if (c < 0x800) {
      C = (C >>> 8) ^ T[(C ^ (192 | ((c >> 6) & 31))) & 0xff];
      C = (C >>> 8) ^ T[(C ^ (128 | (c & 63))) & 0xff];
    } else if (c >= 0xd800 && c < 0xe000) {
      c = (c & 1023) + 64;
      d = str.charCodeAt(i++) & 1023;
      C = (C >>> 8) ^ T[(C ^ (240 | ((c >> 8) & 7))) & 0xff];
      C = (C >>> 8) ^ T[(C ^ (128 | ((c >> 2) & 63))) & 0xff];
      C =
        (C >>> 8) ^ T[(C ^ (128 | ((d >> 6) & 15) | ((c & 3) << 4))) & 0xff];
      C = (C >>> 8) ^ T[(C ^ (128 | (d & 63))) & 0xff];
    } else {
      C = (C >>> 8) ^ T[(C ^ (224 | ((c >> 12) & 15))) & 0xff];
      C = (C >>> 8) ^ T[(C ^ (128 | ((c >> 6) & 63))) & 0xff];
      C = (C >>> 8) ^ T[(C ^ (128 | (c & 63))) & 0xff];
    }
  }
  return C ^ -1;
}

export const signed = crc32;
