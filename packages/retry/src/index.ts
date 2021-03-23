import { delay } from '@zodash/delay';

export interface IOptions {
  /**
   * Retry Max Times
   */
  times: number;

  /**
   * Delay Ms (MiliSeconds)
   */
  delay?: number;
}

export async function retry<R extends any>(
  fn: () => Promise<R>,
  options?: IOptions
) {
  const times = options?.times ?? 0;
  const delayMs = options?.delay ?? 0;

  for (let i = times; i >= 0; i--) {
    try {
      return await fn();
    } catch (error) {
      if (i === 0) {
        throw error;
      }

      // retry after
      if (delayMs) {
        await delay(delayMs);
      }
    }
  }
}

export default retry;
