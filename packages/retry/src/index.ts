import { delay } from '@zodash/delay';
import { timeout } from '@zodash/timeout';

export interface IOptions {
  /**
   * Retry Max Times
   */
  times: number;

  /**
   * Retry Interval (MiliSeconds)
   */
  interval?: number;

  /**
   * Retry Timeout
   */
  timeout?: number;
}

export async function retry<R extends any>(
  fn: () => Promise<R>,
  options?: IOptions,
) {
  const _retries = options?.times ?? 0;
  const _interval = options?.interval ?? 0;
  const _timeout = options?.timeout ?? 5 * 60 * 1000;

  for (let i = _retries; i >= 0; i--) {
    try {
      return await timeout(fn, { ms: _timeout });
    } catch (error) {
      if (i === 0) {
        throw error;
      }

      // retry after
      if (_interval) {
        await delay(_interval);
      }
    }
  }
}

export default retry;
