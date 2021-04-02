export type AsyncFn = () => Promise<any>;

export function runAsyncInPipe<T extends AsyncFn[], I = any>(asyncFns: T, args?: I) {
  return asyncFns.reduce((promise, fn) => {
    return promise.then(fn);
  }, Promise.resolve(args))
}

export default runAsyncInPipe;
