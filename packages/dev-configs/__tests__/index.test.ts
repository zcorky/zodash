import * as base62 from 'base62';
import b62 from '../src';

describe('@zodash/base62', () => {
  it('base62', () => {
    expect(b62(10)).toBe(base62.encode(10));
    expect(b62(13)).toBe(base62.encode(13));
    expect(b62(99)).toBe(base62.encode(99));
    expect(b62(1024)).toBe(base62.encode(1024));
    expect(b62(65535)).toBe(base62.encode(65535));
  });
});
