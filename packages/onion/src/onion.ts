import { compose, Middleware } from '@zodash/compose';

export interface IOnion {
  use(middleware: Middleware<Context>): ThisType<any>;
  callback(): (req: Request, res: Response) => Promise<void>;
  request(request: Request): Promise<Response>;
}

export interface Context {
  options: Options;
  request: Request;
  response: Response;
}

export interface Request {

}

export interface Response {

}

export interface Options {

}

export class Onion implements IOnion {
  private middlewares: Middleware<Context>[] = [];
  private handler: Middleware<Context>;
  private _callback: (request: Request, response: Response) => Promise<any>;

  constructor(private readonly options: Options = {} as Options) {}

  public use(middleware: Middleware<Context>) {
    this.middlewares.push(middleware);
    return this;
  }

  public callback() {
    if (!this.handler) {
      const fn = compose(...this.middlewares);
      this.handler = fn;
    }

    return (request: Request, response: Response) => {
      const context = this.createContext(request, response);
      return this.handler(context);
    };
  }

  public async request(request: Request): Promise<Response> {
    if (!this._callback) {
      this._callback = this.callback();
    }

    const response = {} as Response;
    await this._callback(request, response);
    return response;
  }

  private createContext(request: Request, response: Response): Context {
    return {
      options: this.options,
      request,
      response,
    };
  }
}