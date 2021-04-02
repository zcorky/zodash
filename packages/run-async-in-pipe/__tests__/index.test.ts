import { delay } from '@zodash/delay';
import runAsyncInPipe from '../src';

describe('@zodash/run-async-in-series', () => {
  it('works', async () => {
    const fn1 = async (value = 0) => value + 1;
    const fn2 = async (value = 0) => value + 2;

    expect(await runAsyncInPipe([fn1, fn2])).toEqual(3);
    expect(await runAsyncInPipe([fn1, fn2], 100)).toEqual(103);
  });
});
