import { createProvider } from '../utils';

/**
 * Outlook
 *
 * Issue:
 *  1. 端口除了 465 是 secure true，其他都是 secure false
 *    https://www.coder.work/article/5084851
 *    https://www.thinbug.com/q/46323984
 *
 *  2. 第一次使用需要去邮箱验证手机号
 *    Q: nodemaierl以hotmail(微软邮箱)作为发件人时报错554 5.2.0 STOREDRV.Submission.Exception: OutboundSpamException;
 *    R: https://www.cnblogs.com/taohuaya/p/13745013.html
 */
export default createProvider({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
});
