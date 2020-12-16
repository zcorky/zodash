export class CommonError extends Error {

  constructor(message?: string | Error) {
    const _message = message instanceof Error ? message.message : message;
    
    super(_message);

    Error.captureStackTrace(this, CommonError);
  }
}

export default CommonError;
