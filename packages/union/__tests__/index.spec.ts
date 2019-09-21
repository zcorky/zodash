import { union } from '../src/union';

describe("@zodash/union", () => {
  it('union number[]', () => {
    expect(union([3, 2, 1], [4, 2])).toEqual([1, 2, 3, 4]);
  });

  it('union string[]', () => {
    expect(union(['zero', 'any', 'zero', 'zero', 'zero'], ['any'], ['eason', 'cole'])).toEqual(['zero', 'any', 'eason', 'cole']);
  });

  it('union object[] with by key', () => {
    const oa = [{
      id: '0x10',
      nickname: 'Zero',
    }, {
      id: '0x11',
      nickname: 'Any',
    }, {
      id: '0x10',
      nickname: 'Zero',
    }, {
      id: '0x11',
      nickname: 'Any',
    }];

    const ob = [{
      id: '0x11',
      nickname: 'Any',
    }];

    const oc = [{
      id: '0x12',
      nickname: 'Any',
    }];
    
    const newUsers = union(user => user.id, oa, ob, oc);
    expect(newUsers).toEqual([{
      id: '0x10',
      nickname: 'Zero',
    }, {
      id: '0x11',
      nickname: 'Any',
    }, {
      id: '0x12',
      nickname: 'Any',
    }]);
  });
});
