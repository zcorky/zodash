import {
  Byte,
  transformUnicodeString2Utf8Bytes,
  transformUnicodeString2Utf8String,
  transformUtf8Bytes2UnicodeString,
  transformUtf8String2UnicodeString,
} from './utils';

/**
 * Encode unicode string to utf8 string
 * 
 * @param unicodeStr unicode string
 * @returns utf8 string or bytes
 */
export function encode(unicodeStr: string, type?: 'string'): string;
export function encode(unicodeStr: string, type: 'bytes'): Byte[];
export function encode(unicodeStr: string, type?: 'string' | 'bytes') {
  if (type === 'bytes') {
    return transformUnicodeString2Utf8Bytes(unicodeStr);
  }

  return transformUnicodeString2Utf8String(unicodeStr);
}

/**
 * Decode utf8 string to unicode string
 * 
 * @param utf8Str utf8 string or bytes
 * @returns unicode string
 */
export function decode(utf8Str: string): string
export function decode(utf8Bytes: Byte[]): string
export function decode(utf8: string | Byte[]): string {
  if (Array.isArray(utf8)) {
    return transformUtf8Bytes2UnicodeString(utf8);
  }

  return transformUtf8String2UnicodeString(utf8);
}

export default {
  encode,
  decode,
};