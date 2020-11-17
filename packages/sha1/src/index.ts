import { createHash } from 'crypto';

export const sha1 = (data: string) => createHash('sha1').update(data).digest('hex');

export default sha1;
