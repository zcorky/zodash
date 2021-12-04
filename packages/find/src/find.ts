/**
 * find an object from a list
 *
 * @param list value list
 * @param fn find function
 */
export function find<T>(
  list: T[],
  fn: (one: T, index: number, origin: T[]) => boolean,
): T | null;

/**
 * find an object from a map
 *
 * @param list value map
 * @param fn find function
 */
export function find<K, V>(
  map: Map<K, V>,
  fn: (one: [K, V], index: number, origin: Map<K, V>) => boolean,
): [K, V] | null;

/**
 * find an object from a object
 *
 * @param list value object
 * @param fn find function
 */
export function find<T extends object>(
  data: T,
  fn: (one: [string, any], index: number, origin: T) => boolean,
): [string, T] | null;

export function find(
  data: any,
  fn: (one: any, index: number, origin: any) => boolean,
) {
  if (isArray(data)) return arrayFind(data, fn);
  if (isMap(data)) return mapFind(data, fn);
  if (isObject(data)) return objectFind(data, fn);
  return null;
}

export function arrayFind<T>(
  data: T[],
  fn: (one: T, index: number, origin: T[]) => boolean,
): T | null {
  const value = data.find(fn);
  return value === undefined ? null : value;
}

export function mapFind<K, V>(
  data: Map<K, V>,
  fn: (one: [K, V], index: number, origin: Map<K, V>) => boolean,
): [K, V] | null {
  let index = 0;

  for (const item of data) {
    index += 1;

    if (fn(item, index, data)) {
      return item;
    }
  }

  return null;
}

export function objectFind<T extends object>(
  data: T,
  fn: (one: [string, any], index: number, origin: T) => boolean,
): [string, T] | null {
  let index = 0;

  for (const item of Object.entries(data)) {
    index += 1;

    if (fn(item, index, data)) {
      return item;
    }
  }

  return null;
}

// is.type
function isArray<T>(value: any): value is T[] {
  return Array.isArray(value);
}

function isMap<K, V>(value: any): value is Map<K, V> {
  return Object.prototype.toString.call(value) === '[object Map]';
}

function isObject(value: any): value is object {
  return (
    value !== null &&
    (typeof value === 'object' || typeof value === 'function')
  );
}
