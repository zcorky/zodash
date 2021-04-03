import base64X from '@zodash/base64';
import * as base64JS from 'js-base64';
import base64 from '../src';

describe('@zodash/2fa', () => {
  // Ascii - 1 个字节
  it('ascii', () => {
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'; // 1 个字节
    
     // => QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLw==
    const encodedString = base64X.encode(str);

    expect(base64.encode(str)).toEqual(encodedString);
    expect(base64.encode(str)).toEqual(base64JS.encode(str));
    expect(base64.decode(base64.encode(str))).toEqual(str);
  });

  // Chinese - 2 个字节
  it('chinese', () => {
    const str = '字符编码笔记：ASCII，Unicode 和 UTF-8';
    
    // => 5a2X56ym57yW56CB56yU6K6w77yaQVNDSUnvvIxVbmljb2RlIOWSjCBVVEYtOA==
    const encodedString = base64X.encode(str); // 2 个字节
    
    expect(base64.encode(str)).toEqual(encodedString);
    expect(base64.encode(str)).toEqual(base64JS.encode(str));
    expect(base64.decode(base64.encode(str))).toEqual(str);
  });

  // emoji - 4 个字节
  it('emoji', () => {
    const str = '🚀'; // 4 个字节
    const base64Str = '8J+agA=='; // @TODO base64X.encode(str) => 8J+agA==

    // @TODO
    // expect(base64.encode(str)).toEqual(base64Str);
    // expect(base64.encode(str)).toEqual(base64JS.encode(str));
    // expect(base64.decode(base64Str)).toEqual(str);
    expect(base64.decode(base64.encode(str))).toEqual(str);
  });
});
