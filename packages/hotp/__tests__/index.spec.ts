import * as base32 from 'thirty-two';
import * as jsotp from 'jsotp';

import HOTP from '../src';

describe('@zodash/hotp', () => {
  const hotp = new HOTP();
  const secret = base32.encode('12345678901234567890').toString();

  it('works', async () => {
    const expected = [
      {
        timeCounter: 0,
        otp: 755224,
      },
      {
        timeCounter: 1,
        otp: 287082,
      },
      {
        timeCounter: 2,
        otp: 359152,
      },
      {
        timeCounter: 3,
        otp: 969429,
      },
      {
        timeCounter: 4,
        otp: 338314,
      },
      {
        timeCounter: 5,
        otp: 254676,
      },
      {
        timeCounter: 6,
        otp: 287922,
      },
      {
        timeCounter: 7,
        otp: 162583,
      },
      {
        timeCounter: 8,
        otp: 399871,
      },
      {
        timeCounter: 9,
        otp: 520489,
      },
    ];

    for (const co of expected) {
      expect(await hotp.generate(secret, co.timeCounter)).toBe(String(co.otp));
    }
  });

  it('google authenticator url', async () => {
    const account = 'zero';
    const issuer = 'zcorky';
    expect(await hotp.getURI(secret, account, issuer)).toEqual(`otpauth://hotp/${account}?issuer=${issuer}&secret=${secret}`)
  });

  it('hotop generate correct', async () => {
    const secret = 'BASE32ENCODEDSECRET';
    const jsotp_hotp = jsotp.HOTP(secret);
    expect(await hotp.generate(secret, 0)).toEqual(jsotp_hotp.at(0));
    expect(await hotp.generate(secret, 1)).toEqual(jsotp_hotp.at(1));
    expect(await hotp.generate(secret, 2132)).toEqual(jsotp_hotp.at(2132));
  })
});
