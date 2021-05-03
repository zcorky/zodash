export interface IOptions {
  /**
   * Timeout Ms (MiliSeconds)
   *  default: 3000
   */
  ms?: number;
}

const DEFAULT_TIMEOUT = 3000;
const ERROR = new Error('timeout');

function exception(ms: number) {
  return new Promise((_resolve, reject) => {
    setTimeout(() => reject(ERROR), ms);
  });
}

function toPromise<R>(fnOrPromise: Promise<R> | (() => Promise<R>)) {
  return typeof fnOrPromise === 'function'
    ? fnOrPromise.call(null)
    : fnOrPromise;
}

export async function timeout<R = any>(
  fn: () => Promise<R>,
  options?: IOptions
): Promise<R>;
export async function timeout<R = any>(
  fn: Promise<R>,
  options?: IOptions
): Promise<R>;
export async function timeout<R = any>(
  fnOrPromise: any,
  options?: IOptions
): Promise<R> {
  const ms = options?.ms ?? DEFAULT_TIMEOUT;
  const exceptionPromise = exception(ms);
  const taskPromise = toPromise(fnOrPromise);

  return Promise.race([exceptionPromise, taskPromise]);
}

export default timeout;
