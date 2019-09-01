// import Base64 from 'crypto-js/enc-base64';
import { encode, decode } from '../src/base64';

describe('base64', () => {
  it('encode', () => {
    expect(encode('zero')).toEqual('emVybw==');
  });

  it('decode', () => {
    expect(decode('emVybw==')).toEqual('zero');
  });

  // it('encode', () => {
  //   expect(encode('zero')).toEqual(Base64.parse('zero'));
  // });
});