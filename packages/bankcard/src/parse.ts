// 支付宝 API:
//  => GET https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?cardNo=6222005865412565805&cardBinCheck=true
//  => DC->储蓄卡 | CC->信用卡

import { IBank } from './type';
import data from './data';

export async function parse(cardNumber: string): Promise<IBank | null> {
  await data.lazyLoad();

  let bankCodeAndType: string | null = null;

  for (const item of data.banksRegExpMap) {
    if (item[0].test(cardNumber)) {
      bankCodeAndType = item[1];
      break;
    }
  }

  if (!bankCodeAndType) {
    return null;
  }

  const [bankCode, bankType] = bankCodeAndType.split('#');
  const bank = data.banksDataMap[bankCode];

  return {
    name: bank.name,
    code: bank.code,
    type: data.bankTypesDataMap[bankType],
  };
}
