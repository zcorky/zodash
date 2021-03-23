import { deepEqual } from '@zcorky/deep-equal';
import { zip } from '../src/zip';

describe('@zodash/zip', () => {
  it('same as builtin zip', () => {
    const v1 = zip(['a', 'b'], [1, 2, 3], [true, false], [3]);
    const v2 = [
      ['a', 1, true, 3],
      ['b', 2, false, undefined],
      [undefined, 3, undefined, undefined],
    ];

    expect(deepEqual(v1, v2)).toBeTruthy();
  });
});
