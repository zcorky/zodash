/**
 * Creates a function that is restricted to invoking `func` once. Repeat calls
 * to the function return the value of the first invocation. The `func` is
 * invoked with the `this` binding and arguments of the created function.
 *
 * @param fn The function to be restricted.
 * @return Returns the new restricted function.
 */
export function once<T extends [], R>(fn: (...args: T) => R) {
  let res: R;

  return (...args: T): R => {
    if (fn) {
      res = fn.call(this, ...args);
      (fn as any) = null;
    }

    return res;
  };
}
