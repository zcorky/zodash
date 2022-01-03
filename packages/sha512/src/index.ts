import { createHash } from 'crypto';

export type Encoding = 'hex' | 'base64';

export const sha512 = (data: string, encoding: Encoding = 'hex') =>
  createHash('sha512').update(data).digest(encoding);

export default sha512;
