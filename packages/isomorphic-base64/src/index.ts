import { Base64 } from './base64';

const base64 = new Base64();

/**
 * Encode raw string to base64
 *
 * @param input raw string
 * @returns encoded string
 */
export function encode(input: string) {
  return base64.encode(input);
}

/**
 * Decode base64 to raw string
 *
 * @param input encoded string
 * @returns raw string
 */
export function decode(input: string) {
  return base64.decode(input);
}

export default {
  encode,
  decode,
};
