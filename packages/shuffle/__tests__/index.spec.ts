import { shuffle } from '../src/shuffle';

describe('@zodash/shuffle', () => {
  it('shuffle number[]', () => {
    const array = [1, 2, 3, 4, 5];

    for (let i = 0; i < 10; ++i) {
      const shuffledArray = shuffle(array);
      // console.log(array, shuffledArray);

      // length
      expect(shuffledArray.length).toEqual(array.length);

      const _array = new Array(array.length);
      shuffledArray.forEach((value) => {
        // value
        expect(array.includes(value)).toBeTruthy();
        // index
        const index = array.indexOf(value);
        _array[index] = value;
      });

      // value all used
      expect(_array.every((v) => !!v)).toBeTruthy();
    }
  });

  it('shuffle string[]', () => {
    const array = ['zero', 'any', 'eason', 'cole', 'me'];

    for (let i = 0; i < 10; ++i) {
      const shuffledArray = shuffle(array);
      // console.log(array, shuffledArray);

      // length
      expect(shuffledArray.length).toEqual(array.length);

      const _array = new Array(array.length);
      shuffledArray.forEach((value) => {
        // value
        expect(array.includes(value)).toBeTruthy();
        // index
        const index = array.indexOf(value);
        _array[index] = value;
      });

      // value all used
      expect(_array.every((v) => !!v)).toBeTruthy();
    }
  });
});
