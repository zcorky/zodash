import { createProvider } from '../utils';

/**
 * QQ Enterprise (QQ 企业邮箱)
 */
export default createProvider({
  host: 'smtp.exmail.qq.com',
  port: 465,
  secure: true,
});