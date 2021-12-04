export type Callback<R> = (error: Error | null, res?: R) => void;

// @TODO Type Error: A rest parameter must be last in a parameter list
// export function promisify<T extends any[], R = any>(fn: (...args: T, callback: Callback<R>) => void)

// @TODO Support Overload like util.promisify

export function promisify<T1, R>(
  fn: (v1: T1, callback: Callback<R>) => void,
): (v: T1) => Promise<R>;
export function promisify<T1, T2, R>(
  fn: (v1: T1, v2: T2, callback: Callback<R>) => void,
): (v1: T1, v2: T2) => Promise<R>;
export function promisify<T1, T2, T3, R>(
  fn: (v1: T1, v2: T2, v3: T3, callback: Callback<R>) => void,
): (v1: T1, v2: T2, v3: T3) => Promise<R>;
export function promisify<T1, T2, T3, T4, R>(
  fn: (v1: T1, v2: T2, v3: T3, v4: T4, callback: Callback<R>) => void,
): (v1: T1, v2: T2, v3: T3, v4: T4) => Promise<R>;
export function promisify<T1, T2, T3, T4, T5, R>(
  fn: (v1: T1, v2: T2, v3: T3, v4: T4, v5: T5, callback: Callback<R>) => void,
): (v1: T1, v2: T2, v3: T3, v4: T4, v5: T5) => Promise<R>;
export function promisify<T extends any[], R = any>(
  fn: (...args: T) => void,
) {
  return function (...restArgs: any) {
    return new Promise<R>((resolve, reject) => {
      restArgs.push((error: Error | null, res: R) => {
        if (error) return reject(error);
        return resolve(res);
      });

      fn.apply(this, restArgs);
    });
  };
}

export default promisify;

// import * as util from 'util';
// import * as fs from 'fs';

// type X = Parameters<typeof fs.readFile>;
// //
// const readFile = util.promisify(fs.readFile);
// readFile('x');

// fs.readFile('path', { encoding: 'utf8' }, () => {})
// readFile('path', { encoding: 'utf8' });
