
/**
 * Make Strategies
 * 
 * @param data the data
 * @param strategies the strategies
 * @param keyFn the strategy make function
 */
export function strategy<T, R>(strategies: Record<string, (d: T) => R>, strategyKey: (data: T) => string) {
  return (data: T) => {
    const key = strategyKey(data);
    return strategies[key] ? strategies[key].call(null, data) : undefined;
  }
}