import healthcheck from '../src';

describe('@zodash/websocket', () => {
  it('http', async () => {
    expect(
      await Promise.all([
        healthcheck.http('https://httpbin.zcorky.com'),
        healthcheck.http('https://examplex.com'),
      ]),
    ).toEqual([true, false]);
  });

  it('tcp', async () => {
    expect(
      await Promise.all([
        healthcheck.tcp('httpbin.zcorky.com', 443),
        healthcheck.tcp('example.com', 4443),
        healthcheck.tcp('10.10.10.10', 80),
      ]),
    ).toEqual([true, false, false]);
  });

  it('keyword', async () => {
    expect(
      await Promise.all([
        healthcheck.keyword('https://httpbin.zcorky.com', 'hello'),
        healthcheck.keyword('https://httpbin.zcorky.com', ['hello', 'world']),
        healthcheck.keyword('https://httpbin.zcorky.com', 'zero'),
      ]),
    ).toEqual([true, true, false]);
  });

  it('ping', async () => {
    // expect(await Promise.all([
    //   // healthcheck.ping('127.0.0.1'),
    //   healthcheck.ping('example.com'),
    //   healthcheck.ping('10.10.10.10'),
    // ])).toEqual([
    //   true,
    //   false,
    // ]);

    await expect(healthcheck.ping('example.com')).rejects.toThrow(
      /unsupported/,
    );
  });
});
