import { delay } from '@zodash/delay';
import runAsyncInSeries from '../src';

describe('@zodash/run-async-in-series', () => {
  it('works', async () => {
    const res = [];
    const expected = [1, 2];
    const fn1 = async () => { await delay(10); res.push(1); };
    const fn2 = async () => { await delay(10); res.push(2); };

    await runAsyncInSeries([fn1, fn2]);
    expect(res).toEqual(expected);;
  });
});
