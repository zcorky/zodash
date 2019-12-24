import { _throw } from '../src/throw';

// compose vs pipe

describe("@zodash/throw", () => {
  it('works', () => {
    expect(() => _throw(400, 'xxxx')).toThrow('xxxx');
    try {
      _throw(400, { code: '400123', message: 'business message' })
    } catch (error) {
      expect(error.status).toEqual(400);
      expect(error.message).toEqual('business message');
      expect(error.response).toEqual({ code: '400123', message: 'business message' });
    }
  });
});
