import { iteratee } from '../src/iteratee';

describe('iteratee', () => {
  it('array', () => {
    const iterator = iteratee(['zero', 'any', 'eason', 'cole']);

    expect(iterator()).toEqual('zero');
    expect(iterator()).toEqual('any');
    expect(iterator()).toEqual('eason');
    expect(iterator()).toEqual('cole');
    expect(iterator()).toEqual(undefined);
  });

  it('object', () => {
    const iterator = iteratee({
      zero: 'zero',
      any: 'any',
      eason: 'eason',
      cole: 'cole',
    });

    expect(iterator()).toEqual('zero');
    expect(iterator()).toEqual('any');
    expect(iterator()).toEqual('eason');
    expect(iterator()).toEqual('cole');
    expect(iterator()).toEqual(undefined);
  }
 );

  it('object complex', () => {
    const iterator = iteratee({
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

    expect(iterator()).toEqual({ id: 0, name: 'zero', age: 18 });
    expect(iterator()).toEqual({
      id: 1,
      name: 'any',
      age: 18,
    });
    expect(iterator()).toEqual({
      id: 2,
      name: 'eason',
      age: 100,
    });
    expect(iterator()).toEqual({
      id: 3,
      name: 'cole',
      age: 120,
    });
    expect(iterator()).toEqual(undefined);
  });
});
