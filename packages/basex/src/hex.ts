import customAlphabet from './customAlphabet';

const fn = customAlphabet('0123456789abcdef');

export default function hex(num: number) {
  return fn(num);
}
