/**
 * nodemailer发送邮件各个服务器接口
 *  - article: https://www.huaweicloud.com/articles/0daf3f27118904d5a2ae4f2c784e10b0.html
 *  - services: https://github.com/nodemailer/nodemailer-wellknown/blob/master/services.json
 */

import { IProviderUser } from './../type';
import qqex from './qqex';
import qq from './qq';
import aliyun from './aliyun';
import outlook from './outlook';
import gmail from './gmail';
import wy126 from './126';
import wy163 from './163';

const providers = {
  qqex,
  qq,
  aliyun,
  outlook,
  gmail,
  wy126,
  wy163,
};

type IProvider = keyof typeof providers;

export function createClientByProvider(type: IProvider, user: IProviderUser) {
  if (!providers.hasOwnProperty(type)) {
    throw new Error(
      `Unsupport mail provider: ${type}, only support ${Object.keys(
        providers
      ).join(',')}`
    );
  }

  return providers[type].createClient(user);
}

export default providers;
