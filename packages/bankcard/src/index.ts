export * from './type';
export * from './validate';
export * from './parse';
export * from './generate';

export * from './maybe';

import { parse } from './parse';

export function search(cardNumber: string) {
  return parse(cardNumber);
}
