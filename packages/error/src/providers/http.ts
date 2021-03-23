import CoreError from '../core';

export interface IBody {
  message: number;
}

export interface IHttpError extends Error {
  readonly message: string;
  readonly status?: number; // http status code
  readonly body?: IBody;
}

export interface IOptions {
  message?: string | null;
}

export class HttpError extends CoreError implements IHttpError {
  public status: number; // http status code

  public body: IBody;

  constructor(status: number, message: string | null);

  constructor(status: number, options: IOptions);

  constructor(status: any, options: any = {}) {
    const isMessage = typeof options === 'string' || options === null;

    super();

    const message = isMessage ? options : options?.message ?? 'unknown';

    this.status = status || 500;
    this.message = message;

    this.body = {
      ...options,
      message: this.message,
    };
  }
}

export default HttpError;
