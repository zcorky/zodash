import { deepEqual } from '@zcorky/deep-equal';
import { join } from '../src';

describe('@zodash/join', () => {
  it('works', () => {
    const data = [1, '2', true]
    const v1 = join(data, '~');
    const v2 = data.join('~');

    expect(deepEqual(v1, v2)).toBeTruthy();
  });
});
