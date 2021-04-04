// import * as base32 from 'thirty-two';
import base32 from '@zodash/isomorphic-base32';
// import * as jsSHA from 'jssha';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsSHA = require('jssha');
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const base32 = require('jsotp/lib/base32').Base32;


export function randomToken(length = 16) {
  const str = Math.random().toString(36);
  return base32.encode(str).toString().substr(0, length);
}

export function timeCounter2ByteText(counter: number) {
  const text = new Array(8);
  for (let i = text.length - 1; i >= 0; i--) {
    text[i] = String.fromCharCode(counter & 0xFF);
    counter >>= 8;
  }
  return text.join('');
}

export async function base32Decode(encoded: string): Promise<string> {
  return base32.decode(encoded.toUpperCase()).toString();
}

export async function hmacSha1(key: string, message: string): Promise<string> {
  const hmacSha = new jsSHA('SHA-1', 'BYTES');
  hmacSha.setHMACKey(key, 'BYTES');
  hmacSha.update(message);
  return hmacSha.getHMAC('BYTES');
}

export function truncat(hmacStr: string, digit: number): string {
  function charCodeAt(offset: number) {
    return hmacStr[offset].charCodeAt(0);
  }

  const offset = charCodeAt(19) & 0xf;
  const bin_code = (charCodeAt(offset) & 0x7f) << 24
    | (charCodeAt(offset + 1) & 0xff) << 16
    | (charCodeAt(offset + 2) & 0xff) << 8
    | (charCodeAt(offset + 3) & 0xff);
  let otp = (bin_code % 10 ** digit).toString();
  while (otp.length < digit) {
    otp = '0' + otp;
  }

  return otp;
}
