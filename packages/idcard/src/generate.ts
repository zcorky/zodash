import { number as randomNumber } from '@zodash/random';
import date from '@zcorky/moment';
import * as ADDRESS from './data/address.json';

const codes = Object.keys(ADDRESS);

export interface IOptions {
  /**
   * Address Code, length 6
   */
  addressCode?: string;

  /**
   * Birthday, length 8
   */
  birthday?: string;

  /**
   * Sex, length 1
   */
  sex?: string;
}

export function generate(options?: IOptions) {
  const addressCode = options?.addressCode ?? randomAddressCode();
  const birthday = options?.birthday ?? randomBirthday();
  const sex = options?.sex ?? randomSex();
  const police = randomPolice();
  const checkBit = randomCheckBit();

  return [
    addressCode,
    birthday,
    sex,
    police,
    checkBit,
  ].join('');
}

function randomAddressCode() {
  return codes[randomNumber(codes.length)];
}

function randomBirthday() {
  const min = date('1900-01-01').valueOf();
  const max = date().valueOf();
  const _ = randomNumber(max, min);

  return date(_).format('YYYYMMDD');
}

function randomSex() {
  return randomNumber(10);
}

function randomPolice() {
  return randomNumber(100, 10);
}

function randomCheckBit() {
  return randomNumber(10);
}