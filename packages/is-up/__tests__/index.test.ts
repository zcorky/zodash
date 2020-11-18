import { isUp } from '../src';

describe('is-up', () => {
  // @TODO TOO SLOW when test

  // it('github.com', async () => {
  //   // console.log('fuck:', await isUp('https://github.com/status'));
  //   expect(await isUp('https://github.com/status')).toBeTruthy();

  //   expect(await isUp({
  //     type: 'http',
  //     url: 'https://github.com/status',
  //   })).toBeTruthy();

  //   expect(await isUp({
  //     type: 'tcp',
  //     host: '192.30.255.113',
  //     port: 80,
  //   })).toBeTruthy();

  //   expect(await isUp({
  //     type: 'http',
  //     url: 'https://github.com/status',
  //     timeout: 0,
  //   })).toBeTruthy();

  //   expect(await isUp({
  //     type: 'tcp',
  //     host: '192.30.255.113',
  //     port: 80,
  //     timeout: 0,
  //   })).toBeFalsy();

  //   // expect(await isUp({
  //   //   type: 'tcp',
  //   //   host: '66.66.66.66',
  //   //   port: 80,
  //   //   timeout: 100,
  //   // })).toBeFalsy();
  // });

  // it('baidu.com', async () => {
  //   // console.log('fuck:', await isUp('https://www.baidu.com'));
  //   expect(await isUp('https://www.baidu.com')).toBeTruthy();
  // });

  it('works', () => {
    expect(true).toBeTruthy();
  });
})