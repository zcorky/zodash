import { createHash } from 'crypto';

export type Encoding = 'hex' | 'base64';

export const sha256 = (data: string, encoding: Encoding = 'hex') =>
  createHash('sha256').update(data).digest(encoding);

export default sha256;
