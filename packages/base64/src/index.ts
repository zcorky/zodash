export function encode(text: string) {
  return Buffer.from(text, 'utf8').toString('base64');
}

export function decode(text: string) {
  if (!isValid(text)) {
    throw new Error('Invalid Base64 Text');
  }

  return Buffer.from(text, 'base64').toString('utf8');
}

// reference: https://github.com/dankogai/js-base64/blob/ad8897c84bf6b2607a718fbf390ddde63cb4ceff/base64.ts#L222
export const isValid = (src: any) => {
  if (typeof src !== 'string') return false;
  const s = src.replace(/\s+/g, '').replace(/=+$/, '');
  return !/[^\s0-9a-zA-Z\+/]/.test(s) || !/[^\s0-9a-zA-Z\-_]/.test(s);
}

export default {
  encode,
  decode,
  isValid,
};