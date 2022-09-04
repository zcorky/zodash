import * as router from '../src/router';

describe('@zodash/dom', () => {
  it('works', async () => {
    expect(true).toBe(true);
  });
});

describe('@zodash/dom#router', () => {
  it('parse', async () => {
    expect(router.parse('/user/:id/:name', '/user/1/zodash')).toEqual({
      id: '1',
      name: 'zodash',
    });

    expect(router.parse('/user', '/user')).toEqual({});

    expect(router.parse('/user/:id/:name', '/userx/1/zodash')).toEqual(null);
  });

  it('isMatch', async () => {
    expect(router.isMatch('/user/:id/:name', '/user/1/zodash')).toBeTruthy();
    expect(router.isMatch('/user/:id/:name', '/users/1/zodash')).toBeFalsy();
    expect(router.isMatch('/user/:id/:name', '/user/1/zodash/x')).toBeFalsy();
  });
});
