import { intersection } from '../src/intersection';

describe('@zodash/intersection', () => {
  it('intersection number[]', () => {
    expect(intersection([3, 2, 1], [4, 2])).toEqual([2]);
  });

  it('intersection string[]', () => {
    expect(
      intersection(
        ['zero', 'any', 'zero', 'zero', 'zero'],
        ['any'],
        ['eason', 'cole', 'any'],
      ),
    ).toEqual(['any']);
  });

  it('intersection object[] with by key', () => {
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

    const newUsers = intersection((user) => user.id, oa, ob, oc);
    expect(newUsers).toEqual([
      {
        id: '0x11',
        nickname: 'Any',
      },
    ]);
  });
});
