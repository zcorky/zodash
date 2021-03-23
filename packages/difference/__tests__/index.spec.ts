import { difference } from '../src/difference';

describe('@zodash/difference', () => {
  it('difference number[]', () => {
    expect(difference([3, 2, 1], [4, 2])).toEqual([1, 3]);
  });

  it('difference string[]', () => {
    expect(
      difference(['zero', 'any', 'zero', 'zero', 'zero'], ['any']),
    ).toEqual(['zero']);
  });

  it('difference object[] with by key', () => {
    const users = [
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

    const oldUsers = [
      {
        id: '0x11',
        nickname: 'Any',
      },
    ];

    const newUsers = difference(users, oldUsers, (user) => user.id);
    expect(newUsers).toEqual([
      {
        id: '0x10',
        nickname: 'Zero',
      },
    ]);
  });
});
