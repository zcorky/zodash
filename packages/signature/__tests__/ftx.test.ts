import sign from '../src';
import { IData, IWSEventData } from '../src/ftx';

describe('@zodash/signature:ftx', () => {
  // test-case: https://blog.ftx.com/blog/api-authentication/
  it('GET - without payload', async () => {
    const data: IData = {
      method: 'GET',
      path: '/api/markets',
      timestamp: 1588591511721,
    };
    const secret = 'T4lPid48QtjNxjLUFOcUZghD7CUJ7sTVsfuvQZF2';

    expect(sign.ftx(data, secret)).toEqual(
      'dbc62ec300b2624c580611858d94f2332ac636bb86eccfa1167a7777c496ee6f',
    );
  });

  it('POST - body [string]', async () => {
    const data: IData = {
      method: 'POST',
      path: '/api/orders',
      body:
        '{"market": "BTC-PERP", "side": "buy", "price": 8500, "size": 1, "type": "limit", "reduceOnly": false, "ioc": false, "postOnly": false, "clientId": null}',
      timestamp: 1588591856950,
    };
    const secret = 'T4lPid48QtjNxjLUFOcUZghD7CUJ7sTVsfuvQZF2';

    expect(sign.ftx(data, secret)).toEqual(
      'c4fbabaf178658a59d7bbf57678d44c369382f3da29138f04cd46d3d582ba4ba',
    );
  });

  it('POST - body [object]', async () => {
    const data: IData = {
      method: 'POST',
      path: '/api/orders',
      body: JSON.stringify({
        market: 'BTC-PERP',
        side: 'buy',
        price: 8500,
        size: 1,
        type: 'limit',
        reduceOnly: false,
        ioc: false,
        postOnly: false,
        clientId: null,
      }),
      timestamp: 1588591856950,
    };
    const secret = 'T4lPid48QtjNxjLUFOcUZghD7CUJ7sTVsfuvQZF2';

    expect(sign.ftx(data, secret)).toEqual(
      '2832d853e55db715f59aaadd966cdc51913967da8bf687aad8457a5ac609313e',
    );
  });

  // it('query - object', async () => {
  //   const data: IData = {
  //     method: 'GET',
  //     url: '/api/v4/futures/orders',
  //     query: {
  //       contract: 'BTC_USD',
  //       status: 'finished',
  //       limit: 50,
  //     },
  //     payload: null,
  //     timestamp: 1541993715,
  //   };
  //   const secret = 'secret';

  //   expect(sign.gate(data, secret)).toEqual(
  //     '55f84ea195d6fe57ce62464daaa7c3c02fa9d1dde954e4c898289c9a2407a3d6fb3faf24deff16790d726b66ac9f74526668b13bd01029199cc4fcc522418b8a',
  //   );
  // });

  // test case: https://docs.ftx.com/zh/#6115959cbb
  it('ws', async () => {
    const data: IWSEventData = {
      timestamp: 1557246346499,
    };
    const secret = 'Y2QTHI23f23f23jfjas23f23To0RfUwX3H42fvN-';

    expect(sign.ftx.ws(data, secret)).toEqual(
      'd10b5a67a1a941ae9463a60b285ae845cdeac1b11edc7da9977bef0228b96de9',
    );
  });
});
