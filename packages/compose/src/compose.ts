export type Middleware = <C>(context: C, next: Next) => any | Promise<any>;

export type Next = () => Promise<void>;

/**
 * Compose function
 * 
 * @param middlewares componse functions
 */
export function compose<C>(...middlewares: Middleware[]) {
  return (context: C, next: Next) => {
    let index = -1;

    function dispatch(i: number) {
      if (i <= index) {
        return Promise.reject(new Error(`next() called multiple times`));
      }

      index = i;
      let fn = middlewares[i];
      if (i === middlewares.length) fn = next;
      if (!fn) return Promise.resolve();

      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return dispatch(0);
  };
}