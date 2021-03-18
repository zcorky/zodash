import { observe } from '../src';

describe('@zodash/observable', () => {
  it('run', async () => {

    const data = observe({
      count: 0,
      user: {
        nickname: 'zero',
      },
    }, () => {
      console.log('count:', data.count);

      console.log('user:', data.user.nickname);
    });

    expect(data.count).toBe(0);

    data.count += 1;
    expect(data.count).toBe(1);
  });
});
