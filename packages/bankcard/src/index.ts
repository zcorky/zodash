export * from './type';
export * from './validate';
export * from './parse';
export * from './generate';

import { parse } from './parse';

export function search(cardNumber: string) {
  return parse(cardNumber);
}
