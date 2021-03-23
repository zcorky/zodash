import repeat from '@zodash/repeat';
import IDCard from '../src';
import { generate } from '../src/generate';

describe('@zodash/idcard#generate', () => {
  it('random', () => {
    const d = repeat(1000, () => {
      // expect(new IDCard(generate()).isValid()).toBeTruthy();
      return generate();
    });

    d.forEach((i) => {
      const id = new IDCard(i);
      // console.log("ID:", id.valueOf(), id.toJSON())
      expect(id.isValid()).toBeTruthy();
    });
  });

  it('options', () => {
    expect(new IDCard(generate({})).isValid()).toBeTruthy();
    expect(
      new IDCard(generate({ addressCode: '310101' })).isValid()
    ).toBeTruthy();
    expect(
      new IDCard(
        generate({ addressCode: '310101', birthday: '20101001' })
      ).isValid()
    ).toBeTruthy();
    expect(
      new IDCard(
        generate({ addressCode: '310101', birthday: '20101001', sex: '9' })
      ).isValid()
    ).toBeTruthy();
  });
});
