import { delay } from '@zodash/delay';
import runAsyncInParallel from '../src';

describe('@zodash/run-async-in-series', () => {
  it('works', async () => {
    const fn1 = async () => 1;
    const fn2 = async () => 2;

    expect(await runAsyncInParallel([fn1, fn2])).toEqual([1, 2]);
  });
});
