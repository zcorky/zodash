import { sha256 } from '../src/sha256';

describe('sha256', () => {
  it('hello world', () => {
    const data = 'hello world';
    expect(sha256(data)).toBe(require('crypto-js/sha256')(data).toString());
  });
});
