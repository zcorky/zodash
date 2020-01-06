import { CommonError } from '@zodash/error';

export type Message = string | {
  code: string; // business code
  message: string; // business message
  // [key: string]: any;
};

export function createError(status: number, message: Message) {
  const _message = typeof message === 'string' ? message : message.message;
  const _code = typeof message === 'string' ? status : message.code;

  return new CommonError(_message, {
    status,
    code: _code,
  });
}

export function throwError(status: number, message: Message) {
  throw createError(status, message);
}

export const _throw = throwError;