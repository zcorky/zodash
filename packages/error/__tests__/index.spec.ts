import { CommonError } from '../src/error';

// compose vs pipe

describe("@zodash/throw", () => {
  it('works', () => {
    expect(() => {
      throw new CommonError('xxxx', { status: 400, code: '400123' });
    }).toThrow('xxxx');
  });

  it('options.message will overwrite message', () => {
    try {
      throw new CommonError('xxxx', { status: 400, code: '400123', message: 'business message' })
    } catch (_error) {
      const error = _error as CommonError;
      expect(error.status).toEqual(400);
      expect(error.message).toEqual('business message');
      expect(error.body).toEqual({ code: '400123', message: 'business message' });
    }
  });

  it('create error', () => {
    function createError(status: number, message: string) {
      return new CommonError(message, { status });
    }

    function throwError(status: number, message: string) {
      throw createError(status, message);
    }

    expect(() => throwError(400, 'throw error')).toThrow('throw error');;
  });
});
