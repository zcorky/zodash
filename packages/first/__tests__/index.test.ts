import { deepEqual } from '@zcorky/deep-equal';
import { first } from '../src';

describe('@zodash/first', () => {
  it('works', () => {
    const data = [1, '2', true];
    const v1 = first(data);
    const v2 = 1;

    expect(deepEqual(v1, v2)).toBeTruthy();
  });

  it('empty', () => {
    const data = [];
    const v1 = first(data);
    const v2 = undefined;

    expect(deepEqual(v1, v2)).toBeTruthy();
  });

  it('null', () => {
    const v1 = first(null);
    const v2 = undefined;

    expect(deepEqual(v1, v2)).toBeTruthy();
  });
});
