/**
 * Inspired by lastpass + https://github.com/bradtraversy/50projects50days/blob/master/password-generator/script.js
 */

export interface IGeneratePasswordOptions {
  /**
   * Password Length, min: 6
   */
  length: number;

  /**
   * Allow Uppercase, default: true
   */
  uppercase?: boolean;

  /**
   * Allow lowercase, default: true
   */
  lowercase?: boolean;

  /**
   * Allow numbers, default: true
   */
  numbers?: boolean;

  /**
   * Allow symbols, default: true
   */
  symbols?: boolean;

  /**
   * Avoid numbers and special characters, default: false
   *  that is, numbers = false and symbols = false
   */
  easyToSay?: boolean;

  /**
   * Avoid ambiguous characters, default: false
   *  such as I, l, O, and 0
   */
  easyToRead?: boolean;

  /**
   * Use to tag
   *  if it was leaked, you will first to known
   *  for example, use domain, baidu.com
   *
   *  and it will use characters length
   */
  prefix?: string;
}

const RANDOM_FUNCS = {
  lowercase: getRandomLowercase,
  uppercase: getRandomUppercase,
  numbers: getRandomNumber,
  symbols: getRandomSymbol,
};

const EASY_TO_READY_CHARS_LOWERCASE = 'abcdefghijkmnopqrstuvwxyz';
const EASY_TO_READY_CHARS_UPPERCASE = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
const SYMBOLS = '!@#$%^&*(){}[]=<>/,.';

export function generatePassword(options: IGeneratePasswordOptions) {
  const length = Math.max(options?.length ?? 0, 6);
  const prefix = options?.prefix ?? '';

  const restLength = !prefix ? length : length - prefix.length;
  const maps = {
    uppercase: options?.uppercase ?? true,
    lowercase: options?.lowercase ?? true,
    numbers: options?.numbers ?? true,
    symbols: options?.symbols ?? true,
  };

  if (options?.easyToSay) {
    maps.numbers = false;
    maps.symbols = false;
  }

  const funcs = Object.keys(maps)
    .filter((key) => maps[key])
    .map((key) => RANDOM_FUNCS[key]);

  const res = repeat(restLength, () => {
    const fn = funcs[randomInt(funcs.length)];

    return fn.apply(null, [options?.easyToRead]);
  });

  return [prefix, res].join('');
}

export default generatePassword;

function getRandomLowercase(easyToRead = false) {
  if (easyToRead) {
    return EASY_TO_READY_CHARS_LOWERCASE[
      randomInt(EASY_TO_READY_CHARS_LOWERCASE.length)
    ];
  }

  return String.fromCharCode(randomInt(26, 97));
}

function getRandomUppercase(easyToRead = false) {
  if (easyToRead) {
    return EASY_TO_READY_CHARS_UPPERCASE[
      randomInt(EASY_TO_READY_CHARS_UPPERCASE.length)
    ];
  }

  return String.fromCharCode(randomInt(26, 65));
}

function getRandomNumber(easyToRead = false) {
  if (easyToRead) {
    return String.fromCharCode(randomInt(9, 1) + 48);
  }

  return String.fromCharCode(randomInt(10, 48));
}

function getRandomSymbol() {
  return SYMBOLS[randomInt(SYMBOLS.length)];
}

function randomInt(max: number, base = 0) {
  return Math.floor(Math.random() * max) + base;
}

function repeat(length: number, fn: Function) {
  return new Array(length)
    .fill(0)
    .map(() => fn.call(null))
    .join('');
}
