
export type Message = string | {
  code: string; // business code
  message: string; // business message
  [key: string]: any;
};

export interface CommonError extends Error {
  status: number; // status code
  message: string;
  response: Message;
}

export function createError(status: number, message: Message) {
  const error = new Error() as CommonError;
  error.status = status;
  error.message = typeof message === 'string' ? message : message.message;
  error.response = message;
  return error;
}

export function throwError(status: number, message: Message) {
  throw createError(status, message);
}

export const _throw = throwError;