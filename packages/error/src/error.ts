import { pick } from '@zodash/pick';

export interface Options {
  status?: number;
  code?: string | number;
  message?: string;
  response?: any;
  [key: string]: any;
}

export class CommonError extends Error {
  public code: string | number; // business code
  public status: number; // system code
  public body: Pick<Options, 'code' | 'message'>;
  public response?: any;
  public originalError?: Error;

  constructor(messageOrError: string | Error, options: Options = {} as Options) {
    super();

    const message = options.message
      ? options.message : messageOrError instanceof Error
        ? messageOrError.message : (messageOrError || 'Unknown Error');
    
    this.originalError = messageOrError instanceof Error ? messageOrError : undefined;

    this.status = options.status || 500;
    this.code = options.code || this.status;
    this.message = message;
    this.response = options.response;


    if (!options.code) {
      options.code = this.code;
    }

    if (!options.message) {
      options.message = this.message;
    }

    this.body = pick(options, ['code', 'message']);

    Error.captureStackTrace(this, CommonError);
  }
}