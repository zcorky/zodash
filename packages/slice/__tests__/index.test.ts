import { deepEqual } from '@zcorky/deep-equal';
import { slice } from '../src';

describe('@zodash/slice', () => {
  it('works', () => {
    const data = [1, '2', true];

    expect(deepEqual(slice(data), data.slice())).toBeTruthy();
    expect(deepEqual(slice(data, 1), data.slice(1))).toBeTruthy();
    expect(deepEqual(slice(data, 0, 1), data.slice(0, 1))).toBeTruthy();
  });
});
