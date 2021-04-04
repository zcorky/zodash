import { b32encode } from 'jsotp/lib/nibbler/nibbler';
import base32 from '../src';

describe('@zodash/2fa', () => {
  // Ascii - 1 个字节
  it('works', () => {
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'; // 1 个字节
    const encodedStr = 'IFBEGRCFIZDUQSKKJNGE2TSPKBIVEU2UKVLFOWCZLJQWEY3EMVTGO2DJNJVWY3LON5YHC4TTOR2XM53YPF5DAMJSGM2DKNRXHA4SWLY=======';

    expect(base32.encode(str)).toEqual(encodedStr)
    expect(base32.encode(str)).toEqual(b32encode(str));
    expect(base32.decode(base32.encode(str))).toEqual(str);
  });
});
