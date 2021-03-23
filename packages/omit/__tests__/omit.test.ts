import { deepEqual } from '@zcorky/deep-equal';
import { omit as lomit } from 'lodash';

import { omit } from '../src/omit';

describe('@zodash/omit', () => {
  it('same as lodash.omit', () => {
    const object = { x: 1, y: 2, z: { x: { a: 1 }, y: { m: 3 } } };
    const keys = ['x', 'z'] as (keyof typeof object)[];

    const v1 = omit(object, keys);
    const v2 = lomit(object, keys);

    expect(deepEqual(v1, v2)).toBeTruthy();
  });
});
