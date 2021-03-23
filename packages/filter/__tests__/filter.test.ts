import { deepEqual } from '@zcorky/deep-equal';
import { filter } from '../src/filter';

describe('@zodash/filter', () => {
  it('same as builtin filter', () => {
    const v = [
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ];

    const v1 = filter(v, (c, i) => c.x > 1);
    const v2 = v.filter((c, i) => c.x > 1);

    expect(deepEqual(v1, v2)).toBeTruthy();
  });
});
