import { IDCard } from './core';

export function validate(cardNumber: string) {
  if (cardNumber.length !== 18) {
    return false;
  }

  if (!IDCard.REGEXP.test(cardNumber)) {
    return false;
  }

  return new IDCard(cardNumber).isValid();
}
