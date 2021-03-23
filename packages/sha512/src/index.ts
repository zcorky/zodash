import { createHash } from 'crypto';

export const sha512 = (data: string) => createHash('sha512').update(data).digest('hex');

export default sha512;
