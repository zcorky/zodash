import { toPath } from '../src/to-path';

describe('@zodash/unique', () => {
  it('a.b.c => [a, b, c]', () => {
    expect(toPath('a.b.c')).toEqual(['a', 'b', 'c']);
  });

  it('a[0].b.c => [a, 0, b, c]', () => {
    expect(toPath('a[0].b.c')).toEqual(['a', '0', 'b', 'c']);
  });

  it('a.0.b.c => [a, 0, b, c]', () => {
    expect(toPath('a.0.b.c')).toEqual(['a', '0', 'b', 'c']);
  });

  it('dynamic data empty string', () => {
    expect(toPath(null)).toEqual([]);
  });

  it('a[].b.c => [a, "[]", b, c]', () => {
    expect(toPath('a[].b.c')).toEqual(['a', '[]', 'b', 'c']);
  });
});

describe('@zodash/unique', () => {
  it('custom separator with _', () => {
    expect(toPath('SERVICE_CONFIG_ID', '_')).toEqual([
      'SERVICE',
      'CONFIG',
      'ID',
    ]);
  });

  it('custom separator with #', () => {
    expect(toPath('SERVICE#CONFIG#ID', '#')).toEqual([
      'SERVICE',
      'CONFIG',
      'ID',
    ]);
  });

  it('custom separator with ::', () => {
    expect(toPath('SERVICE::CONFIG::ID', '::')).toEqual([
      'SERVICE',
      'CONFIG',
      'ID',
    ]);
  });
});
