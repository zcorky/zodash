import generatePassword from '../src';

describe('@zodash/pipeline', () => {
  it('works', async () => {
    const length = 10;
    const password = generatePassword({
      length,
    });

    console.log('full password: ', password);
    expect(password.length).toEqual(length);
  });

  it('only uppercase', async () => {
    const length = 10;
    const password = generatePassword({
      length,
      uppercase: true,
      lowercase: false,
      numbers: false,
      symbols: false,
    });

    console.log('uppercase password: ', password);
    expect(password.length).toEqual(length);
  });

  it('only lowercase', async () => {
    const length = 10;
    const password = generatePassword({
      length,
      uppercase: false,
      lowercase: true,
      numbers: false,
      symbols: false,
    });

    console.log('lowercase password: ', password);
    expect(password.length).toEqual(length);
  });

  it('only numbers', async () => {
    const length = 10;
    const password = generatePassword({
      length,
      uppercase: false,
      lowercase: false,
      numbers: true,
      symbols: false,
    });

    console.log('numbers password: ', password);
    expect(password.length).toEqual(length);
  });

  it('only symbols', async () => {
    const length = 10;
    const password = generatePassword({
      length,
      uppercase: false,
      lowercase: false,
      numbers: false,
      symbols: true,
    });

    console.log('symbols password: ', password);
    expect(password.length).toEqual(length);
  });

  it('easy to say', async () => {
    const length = 100;
    const password = generatePassword({
      length,
      easyToSay: true,
    });

    console.log('easy to say password: ', password);
    expect(password.length).toEqual(length);
    expect(
      password.split('').every((c) => {
        if (/[!@#$%^&*(){}\[\]=<>/,.]/.test(c)) return false;
        if (/\d/.test(c)) return false;
        return true;
      }),
    ).toBeTruthy();
  });

  it('easy to read', async () => {
    const length = 100;
    const password = generatePassword({
      length,
      easyToRead: true,
    });

    console.log('easy to read password: ', password);
    expect(password.length).toEqual(length);
    expect(
      password.split('').every((c) => {
        if (/[IlO0]/.test(c)) return false;
        return true;
      }),
    ).toBeTruthy();
  });

  it('prefix', async () => {
    const length = 32;
    const password = generatePassword({
      length,
      prefix: 'baidu.com-',
    });

    console.log('prefix password: ', password);
    expect(password.length).toEqual(length);
    expect(password.startsWith('baidu.com')).toBeTruthy();
  });
});
