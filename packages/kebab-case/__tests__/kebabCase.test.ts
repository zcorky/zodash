import { kebabCase } from '../src/kebabCase';

describe('@zodash/kebab-case', () => {
  it('foo-bar => foo-bar', () => {
    expect(kebabCase('foo-bar')).toBe('foo-bar');
  });

  it('fooBar => foo-bar', () => {
    expect(kebabCase('fooBar')).toBe('foo-bar');
  });

  it('foo-bar-baz => foo-bar-baz', () => {
    expect(kebabCase('foo-bar-baz')).toBe('foo-bar-baz');
  });

  it('fooBarBaz => foo-bar-baz', () => {
    expect(kebabCase('fooBarBaz')).toBe('foo-bar-baz');
  });

  it('foo_bar => foo-bar', () => {
    expect(kebabCase('foo_bar')).toBe('foo-bar');
  });

  it('foo_bar_baz => foo-bar-baz', () => {
    expect(kebabCase('foo_bar_baz')).toBe('foo-bar-baz');
  });

  it('fooB => foo-b', () => {
    expect(kebabCase('fooB')).toBe('foo-b');
  });

  it('foo_b => foo-b', () => {
    expect(kebabCase('foo_b')).toBe('foo-b');
  });

  it('words', () => {
    expect(kebabCase(['foo', 'bar', 'baz'])).toBe('foo-bar-baz');
    expect(kebabCase(['Foo', 'Bar', 'Baz'])).toBe('foo-bar-baz');
    expect(kebabCase(['Foo', 'bar', 'baz'])).toBe('foo-bar-baz');
    expect(kebabCase(['fOo', 'bAr', 'baZ'])).toBe('foo-bar-baz');
  });
});
