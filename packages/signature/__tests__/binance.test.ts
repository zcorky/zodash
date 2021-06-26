import { signature, IData } from '../src/binance';

describe('@zodash/signature/binance', () => {
  const apiKey =
    'vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A';
  const secretKey =
    'NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j';

  // curl -H "X-MBX-APIKEY: vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A" -X POST 'https://api.binance.com/api/v3/order' -d 'symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559&signature=c8db56825ae71d6d79447849e617115f4a920fa2acdcab2b053c4b2838bd6b71'
  it('Example 1: requestBody', async () => {
    const data: IData = {
      body: {
        symbol: 'LTCBTC',
        side: 'BUY',
        type: 'LIMIT',
        timeInForce: 'GTC',
        quantity: 1,
        price: 0.1,
        recvWindow: 5000,
        timestamp: 1499827319559,
      },
    };

    expect(signature(data, secretKey)).toEqual(
      'c8db56825ae71d6d79447849e617115f4a920fa2acdcab2b053c4b2838bd6b71',
    );
  });

  // curl -H "X-MBX-APIKEY: vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A" -X POST 'https://api.binance.com/api/v3/order?symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559&signature=c8db56825ae71d6d79447849e617115f4a920fa2acdcab2b053c4b2838bd6b71'
  it('Example 2: queryString', async () => {
    const data: IData = {
      query: {
        symbol: 'LTCBTC',
        side: 'BUY',
        type: 'LIMIT',
        timeInForce: 'GTC',
        quantity: 1,
        price: 0.1,
        recvWindow: 5000,
        timestamp: 1499827319559,
      },
    };

    expect(signature(data, secretKey)).toEqual(
      'c8db56825ae71d6d79447849e617115f4a920fa2acdcab2b053c4b2838bd6b71',
    );
  });

  // curl -H "X-MBX-APIKEY: vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A" -X POST 'https://api.binance.com/api/v3/order?symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC' -d 'quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559&signature=0fd168b8ddb4876a0358a8d14d0c9f3da0e9b20c5d52b2a00fcf7d1c602f9a77'
  it('Example 3: queryString & requestBody', async () => {
    const data: IData = {
      query: {
        symbol: 'LTCBTC',
        side: 'BUY',
        type: 'LIMIT',
        timeInForce: 'GTC',
      },
      body: {
        quantity: 1,
        price: 0.1,
        recvWindow: 5000,
        timestamp: 1499827319559,
      },
    };

    expect(signature(data, secretKey)).toEqual(
      '0fd168b8ddb4876a0358a8d14d0c9f3da0e9b20c5d52b2a00fcf7d1c602f9a77',
    );
  });
});
