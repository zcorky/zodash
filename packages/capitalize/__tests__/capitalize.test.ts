'use strict';

import { deepEqual } from '@zcorky/deep-equal';

import { capitalize } from '../src/capitalize';

describe('@zodash/pick', () => {
  it('Same as lodash.capitalize', () => {
    expect(deepEqual(capitalize('Zero'), 'Zero')).toBeTruthy();
    expect(deepEqual(capitalize('zero'), 'Zero')).toBeTruthy();
    expect(deepEqual(capitalize('zEro'), 'Zero')).toBeTruthy();
    expect(deepEqual(capitalize('zERO'), 'Zero')).toBeTruthy();
  });
});
