import { deepEqual } from '@zcorky/deep-equal';
import { zipObject } from '../src/zipObject';

describe('@zodash/zipObject', () => {
  it('same as builtin zipObject', () => {
    const v1 = zipObject(['a', 'b'], [1, 2]);
    const v2 = { a: 1, b: 2 };

    expect(deepEqual(v1, v2)).toBeTruthy();
  });
});
