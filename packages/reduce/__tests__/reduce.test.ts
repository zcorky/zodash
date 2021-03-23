import { deepEqual } from '@zcorky/deep-equal';
import { reduce } from '../src/reduce';

describe('@zodash/reduce', () => {
  it('array', () => {
    const v = [
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ];

    const v1 = reduce(v, (p, n) => p + n.x * n.y, 0);
    const v2 = v.reduce((p, n) => p + n.x * n.y, 0);

    expect(deepEqual(v1, v2)).toBeTruthy();
  });

  it('object', () => {
    const v = { x: 1, y: 2 };

    const v1 = reduce<Partial<{ x: number; y: number }>>(
      v,
      (p, n) => {
        const [k, v] = n;
        p[k] = v;
        return p;
      },
      {},
    );

    expect(deepEqual(v1, v)).toBeTruthy();
  });

  it('each', () => {
    const v = { x: 1, y: 2 };
    const p = {} as Partial<{ x: number; y: number }>;

    const each = <T extends object>(v: T, fn: (item: any) => void) => reduce(v, (_, item) => fn(item));

    each(v, (n) => {
      const [k, v] = n;

      p[k] = v;
    });

    expect(deepEqual(p, v)).toBeTruthy();
  });
});
