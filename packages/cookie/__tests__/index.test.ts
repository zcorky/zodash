import cookie from '../src';

declare let global: {
  document: {
    cookie: string;
  };
};

document.cookie = 'ai_user=ACxR4|2020-06-26T03:25:14.465Z';
document.cookie = 'MSCC=NR';
document.cookie = '_clck=2b3mfs6';
document.cookie = 'ai_session=a1kvg5XJWeZG2dxIpdr6Pd|1605959496083|1605959496083';

describe('@zodash/cookie', () => {
  it('get', async () => {
    expect(cookie.get('ai_user')).toBe('ACxR4|2020-06-26T03:25:14.465Z');
    expect(cookie.get('MSCC')).toBe('NR');
    expect(cookie.get('_clck')).toBe('2b3mfs6');
    expect(cookie.get('ai_session')).toBe(
      'a1kvg5XJWeZG2dxIpdr6Pd|1605959496083|1605959496083',
    );
  });

  it('set', async () => {
    cookie.set('whoami', 'zero');
    expect(cookie.get('whoami')).toBe('zero');
    cookie.set('whoami', null);
    expect(cookie.get('whoami')).toBe(undefined);

    cookie.set('whoami', 'zero');
    expect(cookie.get('whoami')).toBe('zero');
    cookie.set('whoami', undefined);
    expect(cookie.get('whoami')).toBe(undefined);
  });

  it('set:maxAge', async () => {
    cookie.set('whoami', 'zero', { maxAge: 1000 });
    await new Promise((r) => setTimeout(r, 300));
    // expect(cookie.get('whoami')).toBe('zero');
    await new Promise((r) => setTimeout(r, 700));
    expect(cookie.get('whoami')).toBe(undefined);
  });

  it('remove', async () => {
    cookie.set('whoami', 'zero', { maxAge: 100 });
    await new Promise((r) => setTimeout(r, 20));
    cookie.remove('whoami');
    expect(cookie.get('whoami')).toBe(undefined);
  });

  it('getAll', async () => {
    const all = cookie.getAll();
    expect(Object.keys(all)).toEqual([
      'ai_user',
      'MSCC',
      '_clck',
      'ai_session',
    ]);
  });

  it('keys', async () => {
    const keys = cookie.keys();
    expect(keys).toEqual(['ai_user', 'MSCC', '_clck', 'ai_session']);
  });

  it('clear', async () => {
    cookie.clear();
    // console.log(cookie.keys());
    expect(cookie.keys().length).toBe(0);
  });
});
