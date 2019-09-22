import { uniqueId } from '../src/unique-id';

describe("@zodash/unique", () => {
  it('works', () => {
    for (let i = 0; i < 100; ++i) {
      expect(uniqueId()).toEqual('' + i);
    }
  });

  it('with prefix', () => {
    for (let i = 0; i < 100; ++i) {
      expect(uniqueId('post-')).toEqual('post-' + (i + 100));
    }
  });
});
