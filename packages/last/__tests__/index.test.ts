import { deepEqual } from '@zcorky/deep-equal';
import { last } from '../src';

describe('@zodash/last', () => {
  it('works', () => {
    const data = [1, '2', true];
    const v1 = last(data);
    const v2 = true;

    expect(deepEqual(v1, v2)).toBeTruthy();
  });

  it('empty', () => {
    const data = [];
    const v1 = last(data);
    const v2 = undefined;

    expect(deepEqual(v1, v2)).toBeTruthy();
  });

  it('null', () => {
    const v1 = last(null);
    const v2 = undefined;

    expect(deepEqual(v1, v2)).toBeTruthy();
  });
});
