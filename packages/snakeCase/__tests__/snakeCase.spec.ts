import { deepEqual } from '@zcorky/deep-equal';
import { camelCase } from '@zodash/camel-case';

import { snakeCase } from '../src/snakeCase';

describe("@zodash/snakeCase", () => {
  it("foo-bar => foo-bar", () => {
    expect(snakeCase('foo-bar')).toBe('foo-bar');
  });

  it("foo-bar-baz => foo-bar-baz", () => {
    expect(snakeCase('foo-bar-baz')).toBe('foo-bar-baz');
  });

  it("fooBarBaz => foo-bar-baz", () => {
    expect(snakeCase('fooBarBaz')).toBe('foo-bar-baz');
  });

  it("fooBar => foo-bar", () => {
    expect(snakeCase('fooBar')).toBe('foo-bar');
  });
});
