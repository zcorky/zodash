/**
 * Process.nextTick in browser
 *
 * @param fn The function to be restricted.
 * @param args The arguments of fn
 */
export function nextTick<T extends(...args: any[]) => void>(
  fn: T,
  delayMs?: number) {
  // @TODO infer parameter
  if (typeof delayMs === 'undefined' && typeof setImmediate !== 'undefined') {
    return setImmediate(fn);
  }

  return setTimeout(fn, delayMs || 0);
}
