/**
 * Copy all of the properties in the source objects over to the destination object
 * 
 * @param origin Origin Object
 * @param sources Source Objects
 * @returns New Object based Origin Object
 * 
 * @example
 *  extend({ name: 'Any' }, { age: 18 }); // => { name: 'Any', age: 18 }
 */
export function extend<T = any>(origin: Partial<T>, ...sources: Partial<T>[]): Partial<T> {
  const _origin = { ...origin };

  sources.forEach(source => {
    Object.keys(source).forEach(key => {
      _origin[key] = source[key];
    });
  });

  return _origin;
}

export default extend;
