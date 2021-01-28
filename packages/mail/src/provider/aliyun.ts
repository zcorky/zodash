import { createProvider } from '../utils';

/**
 * aliyun 企业邮箱
 */
export default createProvider({
  host: 'smtp.mxhichina.com',
  port: 465,
  secure: true,
});