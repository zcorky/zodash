import LRU, { LRU as ILRU } from '@zcorky/lru';

export type ICache<K, V> = ILRU<K, V>;

export class Cache<K = string, V = any>
  extends LRU<K, V>
  implements ICache<K, V> {
  public static create<K = string, V = any>(capacity?: number) {
    return new Cache<K, V>(capacity);
  }
}

export default Cache;
