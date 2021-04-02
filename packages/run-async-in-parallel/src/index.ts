export type AsyncFn<T = any> = () => Promise<T>;

export function runAsyncInParallel<T extends AsyncFn<any>[]>(asyncFns: T) {
  return Promise.all(asyncFns.map(f => f.call(null)));
}

export default runAsyncInParallel;
