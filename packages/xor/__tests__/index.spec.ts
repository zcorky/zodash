import { xor } from '../src/xor';

describe('@zodash/xor', () => {
  it('xor number[]', () => {
    expect(xor([3, 2, 1], [4, 2])).toEqual([1, 3, 4]);
  });

  it('xor string[]', () => {
    expect(
      xor(
        ['zero', 'any', 'zero', 'zero', 'zero'],
        ['any'],
        ['eason', 'cole', 'any'],
      ),
    ).toEqual(['zero', 'eason', 'cole']);
  });

  it('xor object[] with by key', () => {
    const oa = [
      {
        id: '0x10',
        nickname: 'Zero',
      },
      {
        id: '0x11',
        nickname: 'Any',
      },
      {
        id: '0x10',
        nickname: 'Zero',
      },
      {
        id: '0x11',
        nickname: 'Any',
      },
    ];

    const ob = [
      {
        id: '0x11',
        nickname: 'Any',
      },
    ];

    const oc = [
      {
        id: '0x12',
        nickname: 'Eason',
      },
      {
        id: '0x11',
        nickname: 'Any',
      },
    ];

    const newUsers = xor((user) => user.id, oa, ob, oc);
    expect(newUsers).toEqual([
      {
        id: '0x10',
        nickname: 'Zero',
      },
      {
        id: '0x12',
        nickname: 'Eason',
      },
    ]);
  });
});
