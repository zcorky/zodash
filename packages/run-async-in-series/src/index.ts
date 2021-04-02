export type AsyncFn<T = void> = () => Promise<T>;

export function runAsyncInSeries<T extends AsyncFn<void>[]>(asyncFns: T) {
  return asyncFns.reduce((promise, next) => {
    return promise.then(next);
  }, Promise.resolve());
}

export default runAsyncInSeries;
