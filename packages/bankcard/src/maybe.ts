// 支付宝 API:
//  => GET https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?cardNo=6222005865412565805&cardBinCheck=true
//  => DC->储蓄卡 | CC->信用卡

import { IBank } from './type';
import data from './data';
import { find } from './utils';

export async function maybe(cardNumber: string): Promise<IBank | null> {
  await data.lazyLoad();

  const reCodeType = find(data.banksRegExpMaybeMap, ([key]) => {
    return key.test(cardNumber);
  });

  if (!reCodeType) {
    return null;
  }

  const [_, bankCodeAndType] = reCodeType;
  const [bankCode, bankType] = bankCodeAndType.split('#');
  const bank = data.banksDataMap.get(bankCode);

  return {
    name: bank.name,
    code: bank.code,
    type: data.bankTypesDataMap.get(bankType),
  };
}
