import { sha512 } from '../src/sha512';

describe('sha512', () => {
  it('hello world', () => {
    const data = 'hello world';
    expect(sha512(data)).toBe(require('crypto-js/sha512')(data).toString());
  });
})