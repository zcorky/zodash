import { deepEqual } from '@zcorky/deep-equal';

import { camelCase } from '../src/camelCase';

describe('@zodash/camelCase', () => {
  it('fooBar => fooBar', () => {
    expect(camelCase('fooBar')).toBe('fooBar');
  });

  it('foo_bar => fooBar', () => {
    expect(camelCase('foo_bar')).toBe('fooBar');
  });

  it('foo_bar_baz => fooBarBaz', () => {
    expect(camelCase('foo_bar_baz')).toBe('fooBarBaz');
  });

  it('foo-bar => fooBar', () => {
    expect(camelCase('foo-bar')).toBe('fooBar');
  });

  it('foo-bar-baz => fooBarBaz', () => {
    expect(camelCase('foo-bar-baz')).toBe('fooBarBaz');
  });
});
