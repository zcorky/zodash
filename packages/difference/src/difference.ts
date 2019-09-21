/**
 * Creates an array of `array` values not included in the other given arrays
 * 
 * @param main main array
 * @param compare compared array
 * @param by key by
 */
export function difference<T>(main: T[], compare: T[], by: (value: T) => string): T[]
export function difference<T>(main: T[], compare: T[]): T[]
export function difference<T>(main?: T[], compare?: T[], by?: (value: T) => string) {
  const mainMap = main.reduce((all, value) => {
      const key = typeof by === 'function' ? by(value) : value as any as string; 
      all[key] = value;
      return all;
    }, {} as { [key: string]: T });
  
  compare.forEach(value => {
    const key = typeof by === 'function' ? by(value) : value as any as string; 
    if (key in mainMap) {
      delete mainMap[key];
    }
  });

  return Object.values(mainMap);
}