import { compose, Middleware } from '@zodash/compose';

export interface IOnion {
  use(middleware: Middleware<Context>): ThisType<any>;
  callback(): (req: Input, res: Output) => Promise<Context>;
  execute(input: Input): Promise<Output>;
}

export {
  Middleware,
}

export interface Context {
  input: Input;
  output: Output;
}

export interface Input {

}

export interface Output {

}

export abstract class Onion<T extends Context = Context> implements IOnion {
  private middlewares: Middleware<T>[] = [];
  private handler: Middleware<T>;
  private _callback: (input: Input, output: Output) => Promise<T>;

  public use(middleware: Middleware<T>) {
    this.middlewares.push(middleware);
    return this;
  }

  public abstract handle(): Middleware<T>;

  public callback() {
    if (!this.handler) {
      // the core handler
      this.use(this.handle());

      //
      const fn = compose(...this.middlewares);
      this.handler = fn;
    }

    return async (input: Input, output: Output) => {
      const context = this.createContext(input, output);
      await this.handler(context);
      return context;
    };
  }

  public async execute(input: Input): Promise<Output> {
    if (!this._callback) {
      this._callback = this.callback();
    }

    const output = {} as Output;

    const context = await this._callback(input, output);

    return context.output;
  }

  private createContext(input: Input, output: Output): T {
    return {
      input,
      output,
    } as T;
  }
}