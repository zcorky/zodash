/**
 * make array to index
 *
 * @param arr array
 * @param keyFn key string or key function
 *
 * @example
 *  // input
 *  [{ label: '支付宝', value: 'alipay' }, { label: '微信', value: 'wechatpay' }, { label: '银行卡', value: 'bankcard' }]
 *
 *  =>
 *
 *  // output
 *  {
 *    alipay: { label: '支付宝', value: 'alipay' },
 *    wechatpay: { label: '微信', value: 'wechatpay' },
 *    bankcard: { label: '银行卡', value: 'bankcard' },
 *  }
 */
export default function index<T>(
  arr: T[],
  key: string | ((d: T, index: number, arr?: T[]) => string),
) {
  return arr.reduce((all, item, index) => {
    const _key = typeof key === 'string' ? key : key(item, index, arr);
    all[_key] = item;
    return all;
  }, {} as Record<string, T>);
}
