import repeat from '../src';

describe('@zodash/repeat', () => {
  it('string', async () => {
    expect(repeat(5, '*')).toEqual('*****');
  });

  it('function', async () => {
    expect(repeat(5, (index) => {
      return index * 2;
    })).toEqual([0, 2, 4, 6, 8]);
  });
});
