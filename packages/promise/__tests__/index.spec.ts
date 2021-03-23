import { delay } from '@zodash/delay';

import ZPromise from '../src/promise';

// compose vs pipe

describe('@zodash/promise', () => {
  it('works', async () => {
    let data = 0;

    const promise = new ZPromise((resolve) => {
      setTimeout(() => {
        data = 1;
        resolve(data);
      }, 10);
    });
    promise
      .then((value) => {
        expect(data).toEqual(1);
        expect(value).toEqual(1);
      })
      .then(() => {
        console.log('done');

        throw new Error('throwerror');
      })
      .catch((error) => {
        expect(error.message).toEqual('throwerror');
      });

    expect(data).toEqual(0);
    await delay(20);
    expect(data).toEqual(1);
  });

  it('Promise.resolve', async () => {
    let data = 0;

    const promise = ZPromise.resolve(-1);
    promise
      .then((value) => {
        expect(data).toEqual(0);
        expect(value).toEqual(-1);

        data = 1;
      })
      .then(() => {
        console.log('done');

        throw new Error('throwerror');
      })
      .catch(async (error) => {
        await delay(20);

        expect(error.message).toEqual('throwerror');
      });

    expect(data).toEqual(0);
    await delay(20);
    expect(data).toEqual(1);
  });

  it('Promise.reject', async () => {
    let data = 0;

    const promise = ZPromise.reject(new Error('Promise.reject'));
    promise
      .then((value) => {
        expect(data).toEqual(0);
        expect(value).toEqual(-1);

        data = 1;
      })
      .then(() => {
        console.log('done');

        throw new Error('throwerror');
      })
      .catch((error) => {
        expect(error.message).not.toEqual('throwerror');
        expect(error.message).toEqual('Promise.reject');
      });

    expect(data).toEqual(0);
    await delay(20);
    expect(data).toEqual(0);
  });
});
