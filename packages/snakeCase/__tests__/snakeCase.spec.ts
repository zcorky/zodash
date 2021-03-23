import { deepEqual } from '@zcorky/deep-equal';
import { camelCase } from '@zodash/camel-case';

import { snakeCase } from '../src/snakeCase';

describe('@zodash/snakeCase', () => {
  it('foo_bar => foo_bar', () => {
    expect(snakeCase('foo_bar')).toBe('foo_bar');
  });

  it('foo_bar_baz => foo_bar_baz', () => {
    expect(snakeCase('foo_bar_baz')).toBe('foo_bar_baz');
  });

  it('fooBarBaz => foo_bar_baz', () => {
    expect(snakeCase('fooBarBaz')).toBe('foo_bar_baz');
  });

  it('fooBar => foo_bar', () => {
    expect(snakeCase('fooBar')).toBe('foo_bar');
  });
});
