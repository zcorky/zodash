import repeat from '@zodash/repeat';
import IDCard from '../src';

import { generate } from '../src/generate';
import { validate } from '../src/validate';

describe('@zodash/idcard#validate', () => {
  it('ok', () => {
    const d = repeat(100, () => {
      // expect(new IDCard(generate()).isValid()).toBeTruthy();
      return generate();
    });

    d.forEach(i => {
      expect(validate(i)).toBeTruthy();
    });
  });
});