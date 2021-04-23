export function find<K, V>(
  map: Map<K, V>,
  fn: (item: [key: K, value: V], index: number) => boolean
) {
  let index = 0;

  for (const item of map) {
    index += 1;

    if (fn(item, index)) {
      return item;
    }
  }

  return null;
}
