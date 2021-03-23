import { deepEqual } from '@zcorky/deep-equal';
import { pick as lpick } from 'lodash';

import { pick } from '../src/pick';

describe('@zodash/pick', () => {
  it('same as lodash.pick', () => {
    const object = { x: 1, y: 2, z: { x: { a: 1 }, y: { m: 3 } } };
    const keys = (['x', 'z', 'm', 'n'] as any) as ('x' | 'z')[];

    const v1 = pick(object, keys);
    const v2 = lpick(object, keys);

    expect(deepEqual(v1, v2)).toBeTruthy();
  });
});
