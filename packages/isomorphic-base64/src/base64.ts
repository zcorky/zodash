/**
 * Base64 转换方式可以分为四步:
 *   第一步，将每三个字节作为一组，一共是24个二进制位
 *   第二步，将这24个二进制位分为四组，每个组有6个二进制位
 *   第三步，在每组前面加两个00，扩展成32个二进制位，即四个字节
 *   第四步，根据 Base64 索引表，得到扩展后的每个字节的对应符号，这就是Base64的编码值
 *
 * Reference:
 *  通过小实例讲解 base64 原理: https://mp.weixin.qq.com/s/lVJhW5KYtfXdjCEhXVn51g
 *  字符编码笔记：ASCII，Unicode 和 UTF-8: http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html
 *  Base64 Wikipedia: https://zh.wikipedia.org/wiki/Base64
 *  Base64笔记: http://www.ruanyifeng.com/blog/2008/06/base64.html
 *  Base64 RFC (rfc4648): https://tools.ietf.org/html/rfc4648
 *
 * @TODO emoji is broken, use Buffer or @zodash/base64 or js-base64 instead of
 */
import utf8 from '@zodash/utf8';

export interface IBase64 {
  encode(input: string): string;
  decode(input: string): string;
}

export interface IBase64Options {
  alphabet?: string;
  padding?: string;
}

type Byte = number;

const DEFAULT_ALPHABET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const DEFAULT_PADDING = '=';

export class Base64 implements IBase64 {
  constructor(private readonly options?: IBase64Options) {}

  private get alphabet() {
    return this.options?.alphabet ?? DEFAULT_ALPHABET;
  }

  private get padding() {
    return this.options?.padding ?? DEFAULT_PADDING;
  }

  private get dataCharsLength() {
    return 4;
  }

  private get codeCharsLength() {
    return 3;
  }

  private getAlphabetCharByCharCode(charCode: number) {
    if (charCode === -1) {
      return this.padding;
    }

    return this.alphabet.charAt(charCode);
  }

  private getCharCodeByAlphabet(alphabet: string) {
    return this.alphabet.indexOf(alphabet);
  }

  public encode(input: string) {
    // unicode str to utf8 string
    const bytes = utf8.encode(input, 'bytes');

    // utf8 string 按每 3 个字符为一组分组
    const group3s = bytes.reduce((all, charCode, index) => {
      const group = ~~(index / this.codeCharsLength);
      const groupIndex = index % this.codeCharsLength;
      if (!all[group]) {
        all[group] = [];
      }

      all[group][groupIndex] = charCode; // char.charCodeAt(0);
      return all;
    }, [] as number[][]);

    // 每组 3 个字符
    //  每 3 个字符共 24 位，按 6 位一组，可为 4 组，也就是 4 个字符
    return group3s
      .map((group) => {
        const [char1, char2, char3] = group;

        const alphabetCharCodes = [
          char1 >> 2,
          ((char1 & 0b11) << 4) | (char2 >> 4),
          ((char2 & 0b1111) << 2) | (char3 >> 6),
          char3 & 0b111111,
        ];

        if (isNaN(char2)) {
          alphabetCharCodes[2] = alphabetCharCodes[3] = -1;
        } else if (isNaN(char3)) {
          alphabetCharCodes[3] = -1;
        }

        return alphabetCharCodes
          .map((charCode) => this.getAlphabetCharByCharCode(charCode))
          .join('');
      })
      .join('');
  }

  public decode(input: string) {
    const _input = input.replace(/[^A-Za-z0-9+/=]/g, '');

    // 每组 4 个字符
    //  每 4 个字符按位转为 3 个字符
    let i = 0;
    let bytes: Byte[] = [];
    while (i < _input.length) {
      const alphaChars = _input.substr(i, this.dataCharsLength);
      const alphaCodes = alphaChars.split('').map((alphaChar) => {
        return this.getCharCodeByAlphabet(alphaChar);
      });

      const charCode1 = (alphaCodes[0] << 2) | (alphaCodes[1] >> 4);
      const charCode2 =
        ((alphaCodes[1] & 0b1111) << 4) | (alphaCodes[2] >> 2);
      const charCode3 = ((alphaCodes[2] & 0b11) << 6) | alphaCodes[3];

      const group = [charCode1];
      if (alphaCodes[2] !== -1) {
        group.push(charCode2);
      }
      if (alphaCodes[3] !== -1) {
        group.push(charCode3);
      }

      bytes = bytes.concat(group);

      i += 4;
    }

    // utf8 bytes to unicode string
    return utf8.decode(bytes);
  }
}
