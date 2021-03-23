import * as bmd5 from 'blueimp-md5';

export const md5 = (data: string): string => bmd5(data);

export default md5;
