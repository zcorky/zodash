import { observerable, observe } from '../src';

describe('@zodash/observable', () => {
  it('run', async () => {
    const state = observerable({
      count: 0,
      user: {
        nickname: 'zero',
      },
    });

    observe(() => {
      console.log('count:', state.count);

      console.log('user:', state.user.nickname);
    });

    expect(state.count).toBe(0);

    state.count += 1;
    expect(state.count).toBe(1);
  });
});
