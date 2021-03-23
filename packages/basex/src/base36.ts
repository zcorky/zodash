import customAlphabet from './customAlphabet';
const fn = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz');

export default function base62(value: number) {
  return fn(value);
}
