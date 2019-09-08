/**
 * Process.nextTick in browser
 * 
 * @param fn The function to be restricted.
 * @param args The arguments of fn
 */
export function nextTick<T extends (...args: any) => any>(fn: T, ...args: T extends (...args: infer P) => any ? P : never) { // @TODO infer parameter
  if (typeof setImmediate !== 'undefined') {
    return setImmediate(fn, ...(args as any));
  }

  return setTimeout(fn, 0, ...(args as any));
}