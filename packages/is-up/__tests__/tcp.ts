import { isUp } from '../src/tcp';

describe('is-up', () => {
  it('github.com', async () => {
    // console.log('fuck:', await isUp('https://github.com/status'));
    expect(await isUp('192.30.255.113', 80)).toBeTruthy();
  });

  it('baidu.com', async () => {
    // console.log('fuck:', await isUp('https://www.baidu.com'));
    expect(await isUp('39.156.69.79', 80)).toBeTruthy();
  });

  it('unknown.com', async () => {
    // console.log('fuck:', await isUp('https://www.baidu.com'));
    expect(await isUp('66.66.66.66', 80, 1)).toBeFalsy();
  });
});
