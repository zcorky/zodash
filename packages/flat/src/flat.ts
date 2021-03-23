export function flat<T>(value: T[], maxDeepth = 1) {
  function _flat(value: T[], currentDepth = 0) {
    if (currentDepth >= maxDeepth) {
      return value;
    }

    let t: T[] = [];
    for (const element of value) {
      t = Array.isArray(element)
        ? t.concat(_flat(element as any, currentDepth + 1))
        : t.concat(element);
    }

    return t;
  }

  return _flat(value);
}
