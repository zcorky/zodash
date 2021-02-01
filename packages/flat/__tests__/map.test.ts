import { deepEqual } from '@zcorky/deep-equal';
import { flat } from '../src/flat';

describe('flat', () => {
  it('array', () => {
    const v = [1, [2, 3, [4, [5, 6, [7]]]]];

    expect(deepEqual(flat(v), [1, 2, 3, [4, [5, 6, [7]]]])).toBeTruthy();
    expect(deepEqual(flat(v, 2), [1, 2, 3, 4, [5, 6, [7]]])).toBeTruthy();
    expect(deepEqual(flat(v, 3), [1, 2, 3, 4, 5, 6, [7]])).toBeTruthy();
    expect(deepEqual(flat(v, 4), [1, 2, 3, 4, 5, 6, 7])).toBeTruthy();
    expect(deepEqual(flat(v, 5), [1, 2, 3, 4, 5, 6, 7])).toBeTruthy();
    expect(deepEqual(flat(v, 6), [1, 2, 3, 4, 5, 6, 7])).toBeTruthy();
    expect(deepEqual(flat(v, 7), [1, 2, 3, 4, 5, 6, 7])).toBeTruthy();
    expect(deepEqual(flat(v, Infinity), [1, 2, 3, 4, 5, 6, 7])).toBeTruthy();
  });

  // it('object', () => {
  //   const v = { x: 1, y: 2 };
  //   const v1 = map(v, x => x);
  //   const v2 = [['x', 1], ['y', 2]];

  //   expect(deepEqual(v1, v2)).toBeTruthy();
  // });
});
