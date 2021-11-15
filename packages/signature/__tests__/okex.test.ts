import sign from '../src';
import { IData } from '@znode/sign/lib/okex';

describe('@zodash/signature:okex', () => {
  const AccessKey =
    'vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A';
  const SecretKey =
    'NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j';

  it('GET', async () => {
    const data: IData = {
      method: 'GET',
      path: '/api/v5/account/balance',
      timestamp: 1499827319559,
    };

    expect(sign.okex(data, SecretKey)).toEqual(
      'dd27d63bc46ef4cb878ffd089cfbbb119f4183cd9273024d7e7a016236970c55',
    );
  });

  it('POST', async () => {
    const data: IData = {
      method: 'POST',
      path: '/api/v5/account/balance',
      body: {
        posMode: 'long_short_mode',
      },
      timestamp: 1499827319559,
    };

    expect(sign.okex(data, SecretKey)).toEqual(
      '4cfc8147328dc4243edf10bbb8eb1d5a3b5db18d8b1237ff6ea8371ddcfff958',
    );
  });

  it('POST - body allow null | undefined', async () => {
    expect(
      sign.okex(
        {
          method: 'POST',
          path: '/api/v5/account/balance',
          body: null,
          timestamp: 1499827319559,
        },
        SecretKey,
      ),
    ).toEqual(
      '02d4e004f70ef81f285ab02bc5902546436e98b55175af880fc6ca4c8975646b',
    );

    expect(
      sign.okex(
        {
          method: 'POST',
          path: '/api/v5/account/balance',
          body: undefined,
          timestamp: 1499827319559,
        },
        SecretKey,
      ),
    ).toEqual(
      '02d4e004f70ef81f285ab02bc5902546436e98b55175af880fc6ca4c8975646b',
    );

    expect(
      sign.okex(
        {
          method: 'POST',
          path: '/api/v5/account/balance',
          body: '' as any,
          timestamp: 1499827319559,
        },
        SecretKey,
      ),
    ).toEqual(
      '02d4e004f70ef81f285ab02bc5902546436e98b55175af880fc6ca4c8975646b',
    );
  });
});
