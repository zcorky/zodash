import { md5 } from '../src/md5';

describe('md5', () => {
  it('hello world', () => {
    const data = 'hello world';
    expect(md5(data)).toBe(require('crypto-js/md5')(data).toString());
  });
})