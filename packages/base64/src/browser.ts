import { isValid } from './isValid';

export function encode(text: string) {
  return window.btoa(text);
}

export function decode(text: string) {
  if (!isValid(text)) {
    throw new Error('Invalid Base64 Text');
  }

  return window.atob(text);
}

export default {
  encode,
  decode,
  isValid,
};
