const nativeFloor = Math.floor;
const nativeCeil = Math.ceil;
const nativeRandom = Math.random;

function copyArray<T>(array: T[]) {
  return [...array];
}

function baseRandom(lower: number, upper: number) {
  return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
}

function swap(array: any[], left: number, right: number) {
  const value = array[left];
  array[left] = array[right];
  array[right] = value;
}

/**
 * Creates an array of shuffled values
 *
 * @param array the collection to shufflee
 * @returns shuffled collection
 */
export function shuffle<T>(collection: T[]) {
  const _collection = copyArray(collection);
  let index = -1;
  let length = _collection.length;
  let lastIndex = length - 1;

  while (++index < length) {
    const rand = baseRandom(index, lastIndex);
    swap(_collection, index, rand);
  }

  return _collection;
}
