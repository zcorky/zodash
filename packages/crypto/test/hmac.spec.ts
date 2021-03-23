import * as hmac from '../src/hmac';
import * as C from 'crypto-js';

describe('Hmac* (default_encoding: hex)', () => {
  const secret = 'your_secret';
  const data = JSON.stringify({
    id: 'z01',
    username: 'zero',
  });

  it('md5', () => {
    expect(hmac.hmacMD5(data, secret)).toBe(C.HmacMD5(data, secret).toString());
  });

  it('sha1', () => {
    expect(hmac.hmacSHA1(data, secret)).toBe(
      C.HmacSHA1(data, secret).toString()
    );
  });

  it('sha224', () => {
    expect(hmac.hmacSHA224(data, secret)).toBe(
      C.HmacSHA224(data, secret).toString()
    );
  });

  it('sha256', () => {
    expect(hmac.hmacSHA256(data, secret)).toBe(
      C.HmacSHA256(data, secret).toString()
    );
  });

  it('sha384', () => {
    expect(hmac.hmacSHA384(data, secret)).toBe(
      C.HmacSHA384(data, secret).toString()
    );
  });

  it('sha512', () => {
    expect(hmac.hmacSHA512(data, secret)).toBe(
      C.HmacSHA512(data, secret).toString()
    );
  });

  // it('sha3', () => {
  //   expect(hmac.hmacSHA3(data, secret))
  //     .toBe(C.HmacSHA3(data, secret).toString());
  // });
});

describe('Hmac* encoding: base64', () => {
  const secret = 'your_secret';
  const data = JSON.stringify({
    id: 'z01',
    username: 'zero',
  });

  it('md5', () => {
    expect(hmac.hmacMD5(data, secret, 'base64')).toBe(
      C.HmacMD5(data, secret).toString(C.enc.Base64)
    );
  });

  it('sha1', () => {
    expect(hmac.hmacSHA1(data, secret, 'base64')).toBe(
      C.HmacSHA1(data, secret).toString(C.enc.Base64)
    );
  });

  it('sha224', () => {
    expect(hmac.hmacSHA224(data, secret, 'base64')).toBe(
      C.HmacSHA224(data, secret).toString(C.enc.Base64)
    );
  });

  it('sha256', () => {
    expect(hmac.hmacSHA256(data, secret, 'base64')).toBe(
      C.HmacSHA256(data, secret).toString(C.enc.Base64)
    );
  });

  it('sha384', () => {
    expect(hmac.hmacSHA384(data, secret, 'base64')).toBe(
      C.HmacSHA384(data, secret).toString(C.enc.Base64)
    );
  });

  it('sha512', () => {
    expect(hmac.hmacSHA512(data, secret, 'base64')).toBe(
      C.HmacSHA512(data, secret).toString(C.enc.Base64)
    );
  });

  // it('sha3', () => {
  //   expect(hmac.hmacSHA3(data, secret, 'base64'))
  //     .toBe(C.HmacSHA3(data, secret).toString(C.enc.Base64));
  // });
});
