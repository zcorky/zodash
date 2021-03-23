import customAlphabet from './customAlphabet';

export default function basex(base: string | string[], value: number) {
  return customAlphabet(base)(value);
}
