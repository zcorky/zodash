// import Base64 from 'crypto-js/enc-base64';
import { encode, decode } from '../src';

describe('base64', () => {
  it('encode', () => {
    expect(encode('zero')).toEqual('emVybw==');
  });

  it('decode', () => {
    expect(decode('emVybw==')).toEqual('zero');
  });

  it('decode:utf8', () => {
    expect(JSON.parse(decode('eyJ2IjogIjIiLCAicHMiOiAiZ2l0aHViLmNvbS9mcmVlZnEgLSBcdTdmOGVcdTU2ZmQgMTkzIiwgImFkZCI6ICJ2Mi0xNC5zc3JzdWIub25lIiwgInBvcnQiOiAiNDQzIiwgImlkIjogIjljNmE3MTVhLTk3MDctNDJjMy04ZmY2LTk3MzdiZDQ1NmNmMiIsICJhaWQiOiAiMzIiLCAibmV0IjogIndzIiwgInR5cGUiOiAibm9uZSIsICJob3N0IjogIiIsICJwYXRoIjogIiIsICJ0bHMiOiAidGxzIn0=')).ps)
      .toBe('github.com/freefq - 美国 193');
  });

  it('decode:invalid', () => {
    expect(() => decode('无效 base64')).toThrow();
  });

  // it('encode', () => {
  //   expect(encode('zero')).toEqual(Base64.parse('zero'));
  // });
});