import { deepEqual } from '@zcorky/deep-equal';
import { nth } from '../src';

describe('@zodash/nth', () => {
  it('works', () => {
    const data = [1, '2', true];
    const v1 = nth(data, 1);
    const v2 = '2';

    expect(deepEqual(v1, v2)).toBeTruthy();
  });

  it('empty', () => {
    const data = [];
    const v1 = nth(data, 1);
    const v2 = undefined;

    expect(deepEqual(v1, v2)).toBeTruthy();
  });

  it('null', () => {
    const v1 = nth(null, 1);
    const v2 = undefined;

    expect(deepEqual(v1, v2)).toBeTruthy();
  });
});
