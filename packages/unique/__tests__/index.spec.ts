import { unique } from '../src/unique';

describe('@zodash/unique', () => {
  it('unique number[]', () => {
    const array = [1, 2, 2, 2, 3];

    const uniquedArray = unique(array);
    expect(uniquedArray).toEqual([1, 2, 3]);
  });

  it('unique string[]', () => {
    const array = ['zero', 'any', 'zero', 'zero', 'zero'];

    const uniquedArray = unique(array);
    expect(uniquedArray).toEqual(['zero', 'any']);
  });

  it('unique object[] with by key', () => {
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

    const uniquedArray = unique(users, (user) => user.id);
    expect(uniquedArray).toEqual([
      {
        id: '0x10',
        nickname: 'Zero',
      },
      {
        id: '0x11',
        nickname: 'Any',
      },
    ]);
  });

  it('unique object[] with by key, next value will overwrite prev value', () => {
    const users = [
      {
        id: '0x10',
        nickname: 'zero',
      },
      {
        id: '0x11',
        nickname: 'any',
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

    const uniquedArray = unique(users, (user) => user.id);
    expect(uniquedArray).toEqual([
      {
        id: '0x10',
        nickname: 'Zero',
      },
      {
        id: '0x11',
        nickname: 'Any',
      },
    ]);
  });
});
