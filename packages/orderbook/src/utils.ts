export function binaryInsert<T>(
  arr: T[],
  value: T,
  compare: (current: T, index: number, array: T[]) => number,
) {
  const pos = binarySearchPos(arr, compare);
  if (pos === 0) {
    arr.unshift(value);
  } else if (pos === arr.length) {
    arr.push(value);
  } else {
    arr.splice(pos, 0, value);
  }

  return arr.length;
}

export function binarySearchPos<T>(
  arr: T[],
  compare: (current: T, index: number, array: T[]) => number,
): number {
  if (arr.length === 0) return 0;
  if (compare(arr[0], 0, arr) <= 0) return 0;
  if (compare(arr[arr.length - 1], arr.length - 1, arr) >= 0)
    return arr.length;

  let low = 0;
  let high = arr.length - 1;
  let middle: number;

  while (low <= high) {
    middle = low + ~~((high - low) / 2);

    const c = compare(arr[middle], middle, arr);
    if (c === 0) {
      break;
    } else if (c < 0) {
      high = middle - 1;
    } else {
      low = middle + 1;
    }
  }

  if (compare(arr[middle], middle, arr) < 0) {
    middle -= 1;
  }

  return middle + 1;
}

export function binarySearchIndex<T>(
  arr: T[],
  compare: (current: T, index: number, array: T[]) => number,
) {
  if (arr.length === 0) return -1;

  let low = 0;
  let high = arr.length - 1;
  let middle: number;

  while (low <= high) {
    middle = ~~((low + high) / 2);

    const c = compare(arr[middle], middle, arr);
    if (c === 0) {
      return middle;
    } else if (c < 0) {
      high = middle - 1;
    } else {
      low = middle + 1;
    }
  }

  return -1;
}

export function createMatcher<T extends { type: string }>(
  handlers: Record<string, (action: T) => any>,
) {
  return (action: T) => handlers[action.type].apply(null, [action]);
}
