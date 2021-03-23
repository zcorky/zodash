import * as crypto from 'crypto';

const DEFAULT_ENCODING = 'hex';

export async function signature(
  algorithm: 'md5' | 'sha1' | 'sha256' | 'sha384' | 'sha512',
  data: string | Buffer,
  encoding?: crypto.HexBase64Latin1Encoding
) {
  return crypto
    .createHash(algorithm)
    .update(data)
    .digest(encoding || DEFAULT_ENCODING);
}

export default signature;
