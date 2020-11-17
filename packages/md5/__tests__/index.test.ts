import { md5 } from '../src';

describe('md5', () => {
  it('hello world', () => {
    const data = 'hello world';
    expect(md5(data)).toBe(require('crypto-js/md5')(data).toString());
  });
})