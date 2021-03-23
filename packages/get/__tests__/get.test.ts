import { deepEqual } from '@zcorky/deep-equal';
import { get as lget } from 'lodash';

import { get } from '../src/get';

describe('@zodash/get', () => {
  it('same as lodash', () => {
    const object = { a: { b: [{ c: { d: 1, e: false } }] } };

    const v1 = lget(object, 'a.b[0].c.d');
    const v2 = get(object, 'a.b.0.c.d');

    const v3 = lget(object, 'a.c[0].c.d', null);
    const v4 = get(object, 'a.c.0.c.d', null);

    const v5 = lget(object, 'a.c.0.c.d.e');
    const v6 = get(object, 'a.c.0.c.d.e') as any;

    expect(deepEqual(v1, v2 as any)).toBeTruthy();
    expect(deepEqual(v3, v4)).toBeTruthy();
    expect(deepEqual(v5, v6)).toBeTruthy();
  });

  it('array a.b.0.d', () => {
    const object = { a: { b: [{ c: { d: 1, e: false } }] } };

    const v1 = lget(object, 'a.b.0.c.d');
    const v2 = get(object, 'a.b.0.c.d');

    expect(deepEqual(v1, v2 as any)).toBeTruthy();
  });

  it('array a.b[0].d', () => {
    const object = { a: { b: [{ c: { d: 1, e: false } }] } };

    const v1 = lget(object, 'a.b[0].c.d');
    const v2 = get(object, 'a.b[0].c.d');

    expect(deepEqual(v1, v2 as any)).toBeTruthy();
  });

  it('array a.b[].d', () => {
    const object = {
      a: {
        b: [
          { c: { d: 1, e: false } },
          { c: { d: 3, e: true } },
          { c: { d: 'm', e: true } },
        ],
        c: [[[{ x: 1 }], [{ x: 3 }]]],
        d: [
          { x: { y: [{ z: 1 }, { z: 2 }] } },
          { x: { y: [{ z: 3 }, { z: 4 }] } },
        ],
      },
    };

    const v1 = get(object, 'a.b[].c.d') as any;
    const v2 = [1, 3, 'm'];

    const v3 = get(object, 'a.b[]');
    const v4 = [
      { c: { d: 1, e: false } },
      { c: { d: 3, e: true } },
      { c: { d: 'm', e: true } },
    ];

    const v5 = get(object, 'a.b[][][]');
    const v6 = [undefined, undefined, undefined];

    const v7 = get(object, 'a.c[][][].x');
    const v8 = [[[1], [3]]];

    const v9 = get(object, 'a.d[].x.y[].z');
    const v10 = [
      [1, 2],
      [3, 4],
    ];

    expect(deepEqual(v1, v2 as any)).toBeTruthy();
    expect(deepEqual(v3, v4 as any)).toBeTruthy();
    expect(deepEqual(v5, v6 as any)).toBeTruthy();
    expect(deepEqual(v7, v8 as any)).toBeTruthy();
    expect(deepEqual(v9, v10 as any)).toBeTruthy();
  });

  it('nest boolean', () => {
    const res = {
      code: 200,
      message: null,
      data: {
        total: 100,
        data: [
          {
            x: 1,
            y: 2,
            z: {
              m: 'm',
              n: false,
              l: [
                { name: 'z', age: 190 },
                { name: 'v', age: 300 },
              ],
              o: [1, 2, 3],
            },
          },
          {
            x: 1,
            y: 2,
            z: {
              m: 'm',
              n: false,
              l: [
                { name: 'z', age: 190 },
                { name: 'v', age: 300 },
              ],
              o: [1, 2, 3],
            },
          },
        ],
      },
    };

    expect(get(res, 'data.data.0.z.n')).toEqual(false);
  });
});
