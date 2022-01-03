import { createHash } from 'crypto';

export type Encoding = 'hex' | 'base64';

export const sha1 = (data: string, encoding: Encoding = 'hex') =>
  createHash('sha1').update(data).digest(encoding);

export default sha1;
