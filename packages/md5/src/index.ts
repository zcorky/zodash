import { createHash } from 'crypto';

export type Encoding = 'hex' | 'base64';

export const md5 = (data: string, encoding: Encoding = 'hex') =>
  createHash('md5').update(data).digest(encoding);

export default md5;
