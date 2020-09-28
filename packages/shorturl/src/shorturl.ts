import { v3 } from 'murmurhash';
import base62 from '@zodash/base62';

export function shorturl(longurl: string, seed?: number) {
  const hash = v3(longurl, seed);
  return base62(hash);
}

export default shorturl;
