/**
 * UTF-8 的编码规则很简单，只有二条：
 * 1）对于单字节的符号，字节的第一位设为0，后面7位为这个符号的 Unicode 码。因此对于英语字母，UTF-8 编码和 ASCII 码是相同的。
 * 2）对于n字节的符号（n > 1），第一个字节的前n位都设为1，第n + 1位设为0，后面字节的前两位一律设为10。剩下的没有提及的二进制位，全部为这个符号的 Unicode 码。
 * 
 * 下表总结了编码规则，字母x表示可用编码的位。
 * 
 * Unicode符号范围      |        UTF-8编码方式
 * (十六进制)           |       （二进制）
 * ----------------------+---------------------------------------------
 * 0000 0000-0000 007F | 0xxxxxxx
 * 0000 0080-0000 07FF | 110xxxxx 10xxxxxx
 * 0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
 * 0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
 * 
 * Reference:
 *  字符编码笔记：ASCII，Unicode 和 UTF-8 - 阮一峰: http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html
 *  通过小实例讲解 base64 原理 - 黄鹏: https://mp.weixin.qq.com/s/lVJhW5KYtfXdjCEhXVn51g
 *  UTF-8 Wikipedia: https://zh.wikipedia.org/wiki/UTF-8
 *  Unicode Wikipedia: https://zh.wikipedia.org/wiki/Unicode
 */

export type Byte = number;

/**
 * Transform unicode string to utf8 string
 * 
 * @param unicodeString unicode string
 * @returns utf8 string
 */
export function transformUnicodeString2Utf8String(unicodeString: string): string {
  // return utf8Binary2Str(unicode2Utf8Binary(unicodeString));
  return unicodeString
    .replace(/\r\n/g, '\n')
    .split('')
    .reduce((all, char) => {
      const charCode = char.charCodeAt(0);

      const charByte: number[] = []; // new Array(3); // new Uint8Array(3);
      if (charCode <= 0b01111111) { // UTF8 - 1 个字节
        charByte[0] = charCode & 0b01111111;
      } else if (charCode <= 0b000011111111111) { // UTF8 - 2 个字节
        charByte[0] = charCode >> 6 | 0b11000000;
        charByte[1] = charCode & 0b00111111 | 0b10000000;
      } else if (charCode <= 0b1111111111111111) { // UTF8 - 3 个字节
        charByte[0] = charCode >> 12 | 0b11100000;
        charByte[1] = (charCode >> 6 & 0b00111111) | 0b10000000;
        charByte[2] = (charCode & 0b00111111) | 0b10000000;
      } else { // UTF8 - 4 个字节
        charByte[0] = charCode >> 18 | 0b111100000;
        charByte[1] = (charCode >> 12 & 0b00111111) | 0b10000000;
        charByte[2] = (charCode >> 6 & 0b00111111) | 0b10000000;
        charByte[3] = (charCode & 0b00111111) | 0b10000000;
      }

      // byte => char
      return all.concat(charByte.map(code => String.fromCharCode(code)));
    }, [] as string[])
    .join('');
}

/**
 * Transform utf8 string to unicode string
 * 
 * @param utf8String utf8 string
 * @returns unicode string
 */
export function transformUtf8String2UnicodeString(utf8String: string) {
  // return utf8Binary2Unicode(utf8Str2Binary(utf8Str));

  const chars: string[] = [];
  let i = 0;
  while (i < utf8String.length) {
    const c1 = utf8String.charCodeAt(i);

    let charCode: number;
    if (c1 < 0b10000000) { // 1 个字节
      charCode = c1;
      i += 1;
    } else if (c1 >= 0b11000000 && c1 < 0b11100000) { // 2 个字节
      const c2 = utf8String.charCodeAt(i + 1);
      charCode =
        (c1 & 0b0011111) << 6 | // 第一个字节，6 位
        (c2 & 0b00111111); // 第二个字节，6 位

      i += 2;
    } else if (c1 >= 0b11100000 && c1 < 0b11110000) { // 3 个字节
      const c2 = utf8String.charCodeAt(i + 1);
      const c3 = utf8String.charCodeAt(i + 2);

      charCode =
        (c1 & 0b00001111) << 12 | // 第一个字节，4 位
        (c2 & 0b00111111) << 6 | // 第二个字节，6 位
        (c3 & 0b00111111); // 第三个字节，6 位

      i += 3;
    } else { // 4 个字节
      const c2 = utf8String.charCodeAt(i + 1);
      const c3 = utf8String.charCodeAt(i + 2);
      const c4 = utf8String.charCodeAt(i + 3);

      charCode =
        (c1 & 0b00000111) << 18 | // 第 1 个字节，4 位
        (c2 & 0b00111111) << 12 | // 第 2 个字节，6 位
        (c3 & 0b00111111) << 6 | // 第 3 个字节，6 位
        (c4 & 0b00111111); // 第4个字节，6 位

      i += 4;
    }

    // binary => char
    chars.push(String.fromCharCode(charCode))
  }

  return chars.join('');
}


/**
 * Encode unicode string to utf8 bytes
 * 
 * @param unicodeString unicode string
 * @returns utf8 bytes (binary)
 */
export function transformUnicodeString2Utf8Bytes(unicodeString: string): Byte[] {
  const bytes: Byte[] = [];
  return unicodeString
    .replace(/\r\n/g, '\n')
    .split('')
    .reduce((all, char) => {
      const charCode = char.charCodeAt(0);

      const charBytes: number[] = []; // new Array(3); // new Uint8Array(3);
      if (charCode <= 0b01111111) { // UTF8 - 1 个字节
        charBytes[0] = charCode & 0b01111111;
      } else if (charCode <= 0b000011111111111) { // UTF8 - 2 个字节
        charBytes[0] = charCode >> 6 | 0b11000000;
        charBytes[1] = charCode & 0b00111111 | 0b10000000;
      } else if (charCode <= 0b1111111111111111) { // UTF8 - 3 个字节
        charBytes[0] = charCode >> 12 | 0b11100000;
        charBytes[1] = (charCode >> 6 & 0b00111111) | 0b10000000;
        charBytes[2] = (charCode & 0b00111111) | 0b10000000;
      } else { // UTF8 - 4 个字节
        charBytes[0] = charCode >> 18 | 0b111100000;
        charBytes[1] = (charCode >> 12 & 0b00111111) | 0b10000000;
        charBytes[2] = (charCode >> 6 & 0b00111111) | 0b10000000;
        charBytes[3] = (charCode & 0b00111111) | 0b10000000;
      }

      return all.concat(charBytes);
    }, bytes);
}

/**
 * Transform utf8 bytes to unicode string
 * 
 * @param utf8Bytes byte array
 * @returns unicode string
 */
export function transformUtf8Bytes2UnicodeString(utf8Bytes: Byte[]): string {
  const chars: string[] = [];
  let i = 0;
  while (i < utf8Bytes.length) {
    const c1 = utf8Bytes[i];

    let charCode: number;
    if (c1 < 0b10000000) { // 1 个字节
      charCode = c1;
      i += 1;
    } else if (c1 >= 0b11000000 && c1 < 0b11100000) { // 2 个字节
      const c2 = utf8Bytes[i + 1];
      charCode =
        (c1 & 0b0011111) << 6 | // 第一个字节，6 位
        (c2 & 0b00111111); // 第二个字节，6 位

      i += 2;
    } else if (c1 >= 0b11100000 && c1 < 0b11110000) { // 3 个字节
      const c2 = utf8Bytes[i + 1];
      const c3 = utf8Bytes[i + 2];

      charCode =
        (c1 & 0b00001111) << 12 | // 第一个字节，4 位
        (c2 & 0b00111111) << 6 | // 第二个字节，6 位
        (c3 & 0b00111111); // 第三个字节，6 位

      i += 3;
    } else { // 4 个字节
      const c2 = utf8Bytes[i + 1];
      const c3 = utf8Bytes[i + 2];
      const c4 = utf8Bytes[i + 3];

      charCode =
        (c1 & 0b00000111) << 18 | // 第 1 个字节，4 位
        (c2 & 0b00111111) << 12 | // 第 2 个字节，6 位
        (c3 & 0b00111111) << 6 | // 第 3 个字节，6 位
        (c4 & 0b00111111); // 第4个字节，6 位

      i += 4;
    }

    chars.push(String.fromCharCode(charCode))
  }

  return chars.join('');
}

/**
 * Transform bytes to string
 * 
 * @param bytes byte array
 * @returns string
 */
export function bytes2String(bytes: Byte[]) {
  return bytes
    .map(charCode => String.fromCharCode(charCode))
    .join('');
}

/**
 * Transform string to bytes
 * 
 * @param str 
 * @returns byte array
 */
export function string2Bytes(str: string): Byte[] {
  return str
    .split('')
    .map(char => char.charCodeAt(0));
}