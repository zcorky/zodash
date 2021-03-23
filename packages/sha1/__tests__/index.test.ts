import { sha1 } from '../src';

describe('sha1', () => {
  it('hello world', () => {
    const data = 'hello world';
    expect(sha1(data)).toBe(require('crypto-js/sha1')(data).toString());
  });
});
