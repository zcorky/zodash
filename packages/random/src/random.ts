import { nanoid, customAlphabet } from 'nanoid';

const BASESTR = 'abcdef0123456789';

export function feed(length: number) {
  return customAlphabet(BASESTR, length)();
}

/**
 * Produces a random number between the inclusive min and max bounds.
 * 
 * @param min the min bound
 * @param max the max bound
 * @returns the random number between min and max
 */
export function number(min?: number, max?: number) {
  return ~~(Math.random() * (max - min)) + min;
}

export function string(length: number) {
  return feed(length);
}

export function token() {
  return feed(32);
}

export function code() {
  return feed(24);
}

export function password() {
  return nanoid(16);
}

export function key() {
  return token();
}

export function secret() {
  return token();
}


export function captcha() {
  return customAlphabet('0123456789', 6)();
}

export default {
  number,
  string,
  token,
  key,
  secret,
  captcha,
};