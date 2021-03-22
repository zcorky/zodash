import { each } from '../src';

describe('@zodash/each', () => {
  it('array', () => {
    const v = [1, '2', 3];
    const expected = [2, '21', 4];
    const _v = [];
    
    each(v, (item, i) => {
      _v[i] = (item as any) + 1;
    });

    expect(_v).toEqual(expected);;
  });

  it('object', () => {
    const v = { x: 1, y: 2, z: 3};
    const expected = ['x', 'y', 'z'];
    const _v = [];
    
    each(v, (item, i) => {
      _v[i] = item[0];
    });

    expect(_v).toEqual(expected);;
  });
});
