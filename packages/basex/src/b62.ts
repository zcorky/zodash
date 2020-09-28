import customAlphabet from './customAlphabet';
const fn = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

export default function base62(value: number) {
  return fn(value);
}