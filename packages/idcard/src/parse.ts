import { NAMED_REGEX } from './constants';

export function parse(cardNumber: string) {
  const { address, birthday, police, sex, checkCode } =
    cardNumber.match(NAMED_REGEX)?.groups ?? {};

  return {
    address,
    birthday,
    police,
    sex,
    checkCode,
  };
}
