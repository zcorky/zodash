import { deepEqual } from '@zcorky/deep-equal';

import { camelCase } from '../src/camelCase';

describe("@zodash/camelCase", () => {
  it("fooBar => fooBar", () => {
    expect(camelCase('fooBar')).toBe('fooBar');
  });

  it("foo_bar => fooBar", () => {
    expect(camelCase('foo_bar')).toBe('fooBar');
  });

  it("foo-bar => fooBar", () => {
    expect(camelCase('foo-bar')).toBe('fooBar');
  });
});
