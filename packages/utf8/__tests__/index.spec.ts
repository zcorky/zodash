import utf8 from '../src';
import * as utf8Utils from '../src/utils';

describe('@zodash/2fa', () => {
  // Ascii - 1 个字节
  it('ascii', () => {
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'; // 1 个字节
    expect(utf8.encode(str)).toEqual(str);
    expect(utf8.decode(utf8.encode(str))).toEqual(str);
  });

  // Chinese - 2 个字节
  it('chinese', () => {
    const str = '字符编码笔记：ASCII，Unicode 和 UTF-8';
    const encodedString = 'å­ç¬¦ç¼ç ç¬è®°ï¼ASCIIï¼Unicode å UTF-8'; // 2 个字节
    expect(utf8.encode(str)).not.toEqual(str);
    expect(utf8.encode(str)).toEqual(encodedString);
    expect(utf8.decode(utf8.encode(str))).toEqual(str);
  });

  // emoji - 4 个字节
  it('emoji', () => {
    const str = '🚀'; // 4 个字节
    const bytes = [55357, 56960];

    expect(utf8Utils.string2Bytes(str)).toEqual(bytes);
    expect(utf8Utils.bytes2String(bytes)).toEqual(str);

    expect(utf8.encode(str)).toEqual('í ½íº');
    expect(utf8.decode('í ½íº')).toEqual(str);
    expect(utf8.decode(utf8.encode(str))).toEqual(str);
  });

  it('ascii bytes', () => {
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const bytes = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47];
    expect(utf8.encode(str, 'bytes')).toEqual(bytes);
    expect(utf8.decode(bytes)).toEqual(str);
  });

  it('unicode bytes', () => {
    const str = '字符编码笔记：ASCII，Unicode 和 UTF-8';
    // const encodedString = 'å­ç¬¦ç¼ç ç¬è®°ï¼ASCIIï¼Unicode å UTF-8';
    const encodedBytes = [229, 173, 151, 231, 172, 166, 231, 188, 150, 231, 160, 129, 231, 172, 148, 232, 174, 176, 239, 188, 154, 65, 83, 67, 73, 73, 239, 188, 140, 85, 110, 105, 99, 111, 100, 101, 32, 229, 146, 140, 32, 85, 84, 70, 45, 56];
    expect(utf8.encode(str, 'bytes')).toEqual(encodedBytes);
    expect(utf8.decode(encodedBytes)).toEqual(str);
  });

  it('string <=> bytes', () => {
    let encodedString = 'å­ç¬¦ç¼ç ç¬è®°ï¼ASCIIï¼Unicode å UTF-8';
    let encodedBytes = [229, 173, 151, 231, 172, 166, 231, 188, 150, 231, 160, 129, 231, 172, 148, 232, 174, 176, 239, 188, 154, 65, 83, 67, 73, 73, 239, 188, 140, 85, 110, 105, 99, 111, 100, 101, 32, 229, 146, 140, 32, 85, 84, 70, 45, 56];
    expect(utf8Utils.string2Bytes(encodedString)).toEqual(encodedBytes);
    expect(utf8Utils.bytes2String(encodedBytes)).toEqual(encodedString);

    encodedString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    encodedBytes = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47];
    expect(utf8Utils.string2Bytes(encodedString)).toEqual(encodedBytes);
    expect(utf8Utils.bytes2String(encodedBytes)).toEqual(encodedString);
  });
});
