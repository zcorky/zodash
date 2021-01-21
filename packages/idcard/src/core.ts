import now from '@zcorky/moment';

import * as ADDRESS from './data/address.json';
import { NAMED_REGEX } from './constants';

import { parse }from './parse';
import { generate }from './generate';

function getAddressByCode(code: string): string {
  return ADDRESS[code] || '';
}

export class IDCard {
  public static REGEXP = NAMED_REGEX;
  public static generate = generate;

  private parsed = parse(this.cardNumber);

  constructor(private readonly cardNumber: string) {}

  public getAddressCode() {
    return this.parsed.address;
  }

  public getAddress() {
    const province = this.getAddressProvince();
    const city = this.getAddressCity();
    const region = this.getAddressRegion();

    const list = [province.name, city.name, region.name];

    return {
      text: list.join(''),
      list,
    };
  }

  public getAddressProvince() {
    const ad = this.getAddressCode();
    const code = `${ad.slice(0, 2)}0000`;
    const name = getAddressByCode(code);

    return {
      name,
      code
    };
  }

  public getAddressCity() {
    const ad = this.getAddressCode();
    const code = `${ad.slice(0, 4)}00`;
    const name = getAddressByCode(code);
    
    return {
      name,
      code
    };
  }

  public getAddressRegion() {
    const code = this.getAddressCode();
    const name = getAddressByCode(code);
    
    return {
      name,
      code
    };
  }

  public getBirthday() {
    const { birthday: raw } = this.parsed;
    return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6)}`;
  }

  // 男性为奇数，女性为偶数
  public getSex() {
    return (+this.parsed.sex) % 2;
  }

  public getAge() {
    return now().diff(this.getBirthday(), 'year') as number;
  }

  public getCheckCode() {
    return this.parsed.checkCode;
  }

  public toJSON() {
    return {
      address: this.getAddress().text,
      birthday: this.getBirthday(),
      age: this.getAge(),
      sex: this.getSex(),
    };
  }

  public valueOf() {
    return this.cardNumber;
  }

  public toString() {
    return this.toJSON();
  }

  public length() {
    return this.cardNumber.length;
  }

  public isValid() {
    // parse error
    if (!this.parsed.address) {
      return false;
    }

    // address not found
    if (!this.getAddressRegion().name) {
      return false;
    }

    // age >= 0
    if (!this.isAgeGreaterThanOrEquals(0)) {
      return false;
    }

    return true;
  }

  public isAgeGreaterThanOrEquals(age: number) {
    return this.getAge() >= age;
  }

  public isAdult() {
    return this.isAgeGreaterThanOrEquals(18);
  }

  public isMale() {
    return this.getSex() === 1;
  }

  public isFemale() {
    return !this.isMale();
  }
}