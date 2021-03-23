import { ApiError } from '../src';

// compose vs pipe

describe('@zodash/throw', () => {
  it('works', () => {
    expect(() => {
      throw new ApiError(400, { code: '400123', message: 'xxxx' });
    }).toThrow('xxxx');
  });

  it('options.message will overwrite message', () => {
    try {
      throw new ApiError(400, { code: '400123', message: 'business message' });
    } catch (_error) {
      const error = _error as ApiError;
      expect(error.status).toEqual(400);
      expect(error.message).toEqual('business message');
      expect(error.body).toEqual({
        code: '400123',
        message: 'business message',
      });
    }
  });

  it('create error', () => {
    function createError(status: number, message: string) {
      return new ApiError(status, { message });
    }

    function throwError(status: number, message: string) {
      throw createError(status, message);
    }

    expect(() => throwError(400, 'throw error')).toThrow('throw error');
  });
});
