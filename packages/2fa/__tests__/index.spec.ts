import * as tfa from '../src';

describe('@zodash/2fa', () => {
  beforeEach(() => {
    (Date as any).realNow = Date.now;
  });
  afterEach(() => {
    Date.now = (Date as any).realNow;
  })

  const secret = 'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ'; // base32.encode('12345678901234567890')

  it('on unix time 59 sec', async () => {
    Date.now = () => 59 * 1000;
    expect(await tfa.generate(secret)).toEqual('287082');
    expect(await tfa.generate(secret, { length: 8 })).toEqual('94287082');
    expect(await tfa.getTTL()).toEqual(1);
  });

  it('on unix time 1111111109 sec', async () => {
    Date.now = () => 1111111109 * 1000;
    expect(await tfa.generate(secret)).toEqual('081804');
    expect(await tfa.generate(secret, { length: 8 })).toEqual('07081804');
  });

  it('on unix time 1111111111 sec', async () => {
    Date.now = () => 1111111111 * 1000;
    expect(await tfa.generate(secret)).toEqual('050471');
    expect(await tfa.generate(secret, { length: 8 })).toEqual('14050471');
  });

  it('on unix time 1234567890 sec', async () => {
    Date.now = () => 1234567890 * 1000;
    expect(await tfa.generate(secret)).toEqual('005924');
    expect(await tfa.generate(secret, { length: 8 })).toEqual('89005924');
  });

  it('on unix time 2000000000 sec', async () => {
    Date.now = () => 2000000000 * 1000;
    expect(await tfa.generate(secret)).toEqual('279037');
    expect(await tfa.generate(secret, { length: 8 })).toEqual('69279037');
  });

  it('on unix time 20000000000 sec', async () => {
    Date.now = () => 20000000000 * 1000;
    expect(await tfa.generate(secret)).toEqual('353130');
    expect(await tfa.generate(secret, { length: 8 })).toEqual('65353130');
  });

  it('google authenticator url', async () => {
    const secret = 'secret';
    const account = 'zero';
    const issuer = 'zcorky';

    expect(await tfa.getURI(secret, account, issuer)).toEqual(`otpauth://totp/${account}?issuer=${issuer}&secret=${secret}`);
  });
});
