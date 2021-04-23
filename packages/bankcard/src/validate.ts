import { parse } from './parse';

export async function validate(cardNumber: string) {
  return !!(await parse(cardNumber));
}
