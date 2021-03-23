import { isUrl } from '../src/is-url';

// compose vs pipe

describe('@zodash/onion', () => {
  it('works', () => {
    expect(isUrl('http://example')).toBeTruthy();
    expect(isUrl('https://example')).toBeTruthy();
    expect(isUrl('http://example.com')).toBeTruthy();
    expect(isUrl('https://example.com')).toBeTruthy();
  });
});
