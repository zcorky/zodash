import { isValid } from './isValid';

export function encode(text: string) {
  return Buffer.from(text, 'utf8').toString('base64');
}

export function decode(text: string) {
  if (!isValid(text)) {
    throw new Error('Invalid Base64 Text');
  }

  return Buffer.from(text, 'base64').toString('utf8');
}

export default {
  encode,
  decode,
  isValid,
};
