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
): R | undefined {
  const key = keyFn(data);

  return handlers[key] ? handlers[key].call(null, data) : undefined;
}
