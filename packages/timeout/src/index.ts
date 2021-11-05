export interface IOptions {
  /**
   * Timeout Ms (MiliSeconds)
   *  default: 3000
   */
  ms?: number;

  /**
   * Custom Timeout Error Message
   */
  message?: string;
}

const DEFAULT_TIMEOUT = 3000;
const DEFAULT_TIMEOUT_ERROR_MESSAGE = 'timeout';

function exception(ms: number, message?: string) {
  const error = new Error(message ?? DEFAULT_TIMEOUT_ERROR_MESSAGE);

  return new Promise((_resolve, reject) => {
    setTimeout(() => reject(error), ms);
  });
}

function toPromise<R>(fnOrPromise: Promise<R> | (() => Promise<R>)) {
  return typeof fnOrPromise === 'function'
    ? fnOrPromise.call(null)
    : fnOrPromise;
}

export async function timeout<R = any>(
  fn: () => Promise<R>,
  options?: IOptions,
): Promise<R>;
export async function timeout<R = any>(
  fn: Promise<R>,
  options?: IOptions,
): Promise<R>;
export async function timeout<R = any>(
  fnOrPromise: any,
  options?: IOptions,
): Promise<R> {
  const ms = options?.ms ?? DEFAULT_TIMEOUT;
  const exceptionPromise = exception(ms, options?.message);
  const taskPromise = toPromise(fnOrPromise);

  return Promise.race([exceptionPromise, taskPromise]);
}

export default timeout;
