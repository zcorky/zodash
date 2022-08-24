import { delay } from '@zodash/delay';
import retry from '../src';

describe('@zodash/Container', () => {
  it('works', async () => {
    let i = 0;

    const res = await retry(
      async () => {
        i++;

        if (i !== 4) {
          throw new Error();
        }

        return i;
      },
      { times: 3 },
    );

    expect(i).toBe(4);
    expect(res).toBe(4);
  });

  it('default times 0', async () => {
    let i = 0;

    const res = await retry(async () => {
      i++;
      return i;
    });

    expect(i).toBe(1);
    expect(res).toBe(1);
  });

  it('throw error', async () => {
    let i = 0;

    const fn = async () => {
      i++;

      // console.log('xxx:', i);
      if (i <= 4) {
        throw new Error('throw error');
      }
    };

    i = 0;
    await expect(retry(fn)) // 4
      .rejects.toThrowError();

    i = 0;
    await expect(retry(fn, { times: 1 })) // 4
      .rejects.toThrowError();

    i = 0;
    await expect(retry(fn, { times: 2 })) // 4
      .rejects.toThrowError();

    i = 0;
    await expect(retry(fn, { times: 3 })) // 4
      .rejects.toThrowError();

    i = 0;
    await expect(retry(fn, { times: 4 })) // 4
      .resolves.not.toThrowError();

    i = 0;
    await expect(retry(fn, { times: 5 })) // 4
      .resolves.not.toThrowError();
  });

  it('interval', async () => {
    let i = 0;

    const fn = async () => {
      i++;

      // console.log('xxx:', i);
      if (i <= 2) {
        throw new Error('throw error');
      }
    };

    i = 0;
    let startedAt = Date.now();
    await retry(fn, { times: 2 });
    expect(Date.now() - startedAt).toBeLessThan(100);

    i = 0;
    startedAt = Date.now();
    await retry(fn, { times: 2, interval: 100 });
    expect(Date.now() - startedAt).toBeGreaterThan(100);
  });

  it('timeout', async () => {
    const fn = async () => {
      await delay(1000);
    };

    let catchedError: Error = null;

    try {
      await retry(fn, { times: 0, timeout: 10 });
    } catch (error) {
      catchedError = error;
    }

    expect(catchedError.message).toEqual('timeout');
  });
});
