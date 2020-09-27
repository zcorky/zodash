import { v3 } from 'murmurhash';
import * as base62 from 'base62';

export function shorturl(longurl: string, seed?: number) {
  const hash = v3(longurl, seed);
  return base62.encode(hash);
}

export default shorturl;
