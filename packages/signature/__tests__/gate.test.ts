import sign from '../src';
import { IData, IWSEventData } from '../src/gate';

describe('@zodash/signature:gate', () => {
  it('GET - without payload', async () => {
    const data: IData = {
      method: 'GET',
      url: '/api/v4/futures/orders',
      query: 'contract=BTC_USD&status=finished&limit=50',
      payload: null,
      timestamp: 1541993715,
    };
    const secret = 'secret';

    expect(sign.gate(data, secret)).toEqual(
      '55f84ea195d6fe57ce62464daaa7c3c02fa9d1dde954e4c898289c9a2407a3d6fb3faf24deff16790d726b66ac9f74526668b13bd01029199cc4fcc522418b8a',
    );
  });

  it('POST - with payload', async () => {
    const data: IData = {
      method: 'POST',
      url: '/api/v4/futures/orders',
      query: '',
      payload:
        '{"contract":"BTC_USD","type":"limit","size":100,"price":6800,"time_in_force":"gtc"}',
      timestamp: 1541993715,
    };
    const secret = 'secret';

    expect(sign.gate(data, secret)).toEqual(
      'eae42da914a590ddf727473aff25fc87d50b64783941061f47a3fdb92742541fc4c2c14017581b4199a1418d54471c269c03a38d788d802e2c306c37636389f0',
    );
  });

  it('query - object', async () => {
    const data: IData = {
      method: 'GET',
      url: '/api/v4/futures/orders',
      query: {
        contract: 'BTC_USD',
        status: 'finished',
        limit: 50,
      },
      payload: null,
      timestamp: 1541993715,
    };
    const secret = 'secret';

    expect(sign.gate(data, secret)).toEqual(
      '55f84ea195d6fe57ce62464daaa7c3c02fa9d1dde954e4c898289c9a2407a3d6fb3faf24deff16790d726b66ac9f74526668b13bd01029199cc4fcc522418b8a',
    );
  });

  it('payload - object', async () => {
    const data: IData = {
      method: 'POST',
      url: '/api/v4/futures/orders',
      query: '',
      payload: {
        contract: 'BTC_USD',
        type: 'limit',
        size: 100,
        price: 6800,
        time_in_force: 'gtc',
      },
      timestamp: 1541993715,
    };
    const secret = 'secret';

    expect(sign.gate(data, secret)).toEqual(
      'eae42da914a590ddf727473aff25fc87d50b64783941061f47a3fdb92742541fc4c2c14017581b4199a1418d54471c269c03a38d788d802e2c306c37636389f0',
    );
  });

  it('realword', async () => {
    const data: IData = {
      method: 'GET',
      url: '/spot/accounts',
      query: null,
      payload: null,
      timestamp: 1624523009.931,
    };
    const secret =
      '59p59rtcrah69bsqsrjd73585zvavnrf9nt78hrbnkh65u5hbrcxr5y5crhdgqvw';

    expect(sign.gate(data, secret)).toEqual(
      '017cc74dedde49babb27aa821c4e9ac6c06e9ff982d35e3b179e2f9cf77174080aeb68a4e7ee942933e2be935b6e5aa4bbfc99c87e4c2b8c4a82a4aeab2c56fb',
    );
  });

  it('ws', async () => {
    const data: IWSEventData = {
      channel: 'spot.orders',
      event: 'subscribe',
      time: 1541993715,
    };
    const secret =
      '59p59rtcrah69bsqsrjd73585zvavnrf9nt78hrbnkh65u5hbrcxr5y5crhdgqvw';

    expect(sign.gate.ws(data, secret)).toEqual(
      'a0fad3dabeba6ca7992bb8ad5eb7bbc142b24436c71e3e34ba5213658ca5d9a07319a11c89703acb051f11249008cbc68dc531769b4d029b8246f3f7d0c737d5',
    );
  });
});
