/**
 *
 * @param data object
 * @param handlers reducers
 * @param keyFn key function
 */
export function match<T, R>(
  data: T,
  handlers: Record<string, (d: T) => R>,
  keyFn: (data: T) => string,
): R | undefined;
export function match(data: any, handlers: any, keyFn: any) {
  const key = keyFn(data);

  return handlers[key] ? handlers[key].call(null, data) : undefined;
}
