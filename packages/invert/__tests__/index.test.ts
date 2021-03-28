import { invert } from '../src';

describe('@zodash/invert', () => {
  it('works', () => {
    const origin = { 'a': 1, 'b': 2, 'c': 1 };
    const expected = { '1': 'c', '2': 'b' };

    expect(invert(origin)).toEqual(expected);
  });

  it('by', () => {
    const origin = { 'a': 1, 'b': 2, 'c': 1 };
    const expected = { 'group1': 'c', 'group2': 'b' };

    expect(invert(origin, v => `group${v}`)).toEqual(expected);
  });
});
