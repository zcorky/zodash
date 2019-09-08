import { generatee } from '../src/generatee';

describe('generatee', () => {
  it('array', () => {
    const generator = generatee(['zero', 'any', 'eason', 'cole']);

    expect(generator.next()).toEqual({ done: false, value: 'zero' });
    expect(generator.next()).toEqual({ done: false, value: 'any' });
    expect(generator.next()).toEqual({ done: false, value: 'eason' });
    expect(generator.next()).toEqual({ done: false, value: 'cole' });
    expect(generator.next()).toEqual({ done: true, value: undefined });
  });

  it('object', () => {
    const generator = generatee({
      zero: 'zero',
      any: 'any',
      eason: 'eason',
      cole: 'cole',
    });

    expect(generator.next()).toEqual({ done: false, value: 'zero' });
    expect(generator.next()).toEqual({ done: false, value: 'any' });
    expect(generator.next()).toEqual({ done: false, value: 'eason' });
    expect(generator.next()).toEqual({ done: false, value: 'cole' });
    expect(generator.next()).toEqual({ done: true, value: undefined });
  });

  it('object complex', () => {
    const generator = generatee({
      zero: {
        id: 0,
        name: 'zero',
        age: 18,
      },
      any: {
        id: 1,
        name: 'any',
        age: 18,
      },
      eason: {
        id: 2,
        name: 'eason',
        age: 100,
      },
      cole: {
        id: 3,
        name: 'cole',
        age: 120,
      },
    });

    expect(generator.next()).toEqual({ done: false, value: { id: 0, name: 'zero', age: 18 } });
    expect(generator.next()).toEqual({ done: false, value: {
      id: 1,
      name: 'any',
      age: 18,
    } });
    expect(generator.next()).toEqual({ done: false, value: {
      id: 2,
      name: 'eason',
      age: 100,
    } });
    expect(generator.next()).toEqual({ done: false, value: {
      id: 3,
      name: 'cole',
      age: 120,
    } });
    expect(generator.next()).toEqual({ done: true, value: undefined });
  });
});
