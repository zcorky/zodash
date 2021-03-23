import CoreError from '../core';

export interface IApiError extends Error {
  readonly code: string | number; // business code
  readonly message: string;
  readonly status?: number; // system code
  readonly body?: Pick<IOptions, 'code' | 'message'>;
  readonly response?: Response;
}

// export type Status = number;
// export type Code = number | string;
// export type Message = string | null;

export interface IOptions {
  code?: number | string;
  message?: string | null;
  [key: string]: any;
}

export class ApiError extends CoreError implements IApiError {
  public code: string | number; // business code

  public status: number; // system code

  public body: Pick<IOptions, 'code' | 'message'>;

  public response?: Response;

  constructor(code: number, message: string | null);

  constructor(status: number, options: IOptions);

  constructor(status: any, options: any = {}) {
    const isCodeMessage = typeof options === 'string' || options === null;

    super();

    if (isCodeMessage) {
      this.status = 200;
      this.code = status;
      this.message = options;

      this.body = {
        code: this.code,
        message: this.message,
      };
    } else {
      const message = options?.message ?? 'Unknown Error';

      this.status = isCodeMessage ? 200 : status || 500;
      this.code = options.code || this.status;
      this.message = message;

      this.body = {
        ...options,
        code: this.code,
        message: this.message,
      };

      this.response = options?.response;
    }
  }
}

export default ApiError;
