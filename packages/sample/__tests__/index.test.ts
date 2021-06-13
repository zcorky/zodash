import { deepEqual } from '@zcorky/deep-equal';
import { repeat } from '@zodash/repeat';
import { sample } from '../src';

describe('@zodash/sample', () => {
  it('works', () => {
    const data = [1, 2, 3, 4, 'a', true];
    
    repeat(100, () => {
      const value = sample(data);
      expect(data.includes(value)).toBeTruthy();
    })
  });
});
