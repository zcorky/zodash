import sign from '../src';
import { IData } from '../src/woo';

describe('@zodash/signature:woo', () => {
  const AccessKey = 'AbmyVJGUpN064ks5ELjLfA==';
  const SecretKey = 'QHKRXHPAW1MC9YGZMAT8YDJG2HPR';

  it('POST', async () => {
    // POST / v1 / order

    // # Body parameter:
    // symbol: SPOT_BTC_USDT
    // order_type: LIMIT
    // order_price: 9000
    // order_quantity: 0.11
    // side: BUY

    const data: IData = {
      body: {
        symbol: 'SPOT_BTC_USDT',
        order_type: 'LIMIT',
        order_price: 9000,
        order_quantity: 0.11,
        side: 'BUY',
      },
      timestamp: 1578565539808,
    };

    expect(sign.woo(data, SecretKey)).toEqual(
      '20da0852f73b20da0208c7e627975a59ff072379883d8457d03104651032033d',
    );
  });
});
