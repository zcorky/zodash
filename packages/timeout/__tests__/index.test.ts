import { delay } from '@zodash/delay';
import timeout from '../src';

describe('@zodash/timeout', () => {
  const value = 'zero';
  const cfn = (ms: number) => {
    return async () => {
      await delay(ms);
      return value;
    };
  };

  it('normal', async () => {
    expect(await timeout(cfn(0))).toEqual(value);
    expect(await timeout(cfn(0), { ms: 100 })).toEqual(value);
  });

  it('timeout', async () => {
    await expect(timeout(cfn(3100))).rejects.toThrowError('timeout');
    await expect(timeout(cfn(110), { ms: 100 })).rejects.toThrowError(
      'timeout'
    );
  });

  it('promise', async () => {
    expect(await timeout(cfn(0)(), { ms: 100 })).toEqual(value);
    await expect(timeout(cfn(110)(), { ms: 100 })).rejects.toThrowError(
      'timeout'
    );
  });
});
