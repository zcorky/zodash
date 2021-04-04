import Nibbler from './baseX';

const base32 = new Nibbler({
  dataBits: 8,
  codeBits: 5,
  keyString: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
  pad: '=',
});

/**
 * Encode raw string to base32
 * 
 * @param input raw string
 * @returns encoded string
 */
export function encode(input: string) {
  return base32.encode(input);
}

/**
 * Decode base32 to raw string
 * 
 * @param input encoded string
 * @returns raw string
 */
export function decode(input: string) {
  return base32.decode(input);
}

export default {
  encode,
  decode,
};