export function encode(text: string) {
  return Buffer.from(text).toString('base64');
}

export function decode(text: string) {
  return Buffer.from(text, 'base64').toString('ascii');
}