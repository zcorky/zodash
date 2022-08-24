/**
 * Returns a new function that, when invoked, invokes `fn` at most once per `wait` milliseconds.
 *
 * @see https://github.com/component/throttle/blob/master/index.js
 * @see https://github.com/mqyqingfeng/Blog/issues/26
 *
 * @param {Function} function to wrap
 * @param {Number} wait Number of milliseconds that must elapse between `fn` invocations.
 * @return {Function} function that wraps the `fn` function passed in.
 */
export function throttle<T extends any[], R>(
  fn: (...args: T) => R,
  wait: number,
): (...args: T) => R {
  let ctx: any, args: any, timeout: NodeJS.Timeout | null, result: any;
  let last = 0;

  function call() {
    last = +new Date();
    result = fn.apply(ctx, args);
    timeout = null;
  }

  return (..._args) => {
    ctx = this;
    args = _args;
    const delta = +new Date() - last;
    if (!timeout) {
      if (delta >= wait) call();
      else timeout = setTimeout(call, wait - delta);
    }
    return result;
  };
}

export default throttle;
