import { compose, Middleware } from '@zodash/compose';

export interface IOnion {
  use(middleware: Middleware<Context>): ThisType<any>;
  callback(): (req: Input, res: Output) => Promise<void>;
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

export class Onion implements IOnion {
  private middlewares: Middleware<Context>[] = [];
  private handler: Middleware<Context>;
  private _callback: (input: Input, output: Output) => Promise<any>;

  public use(middleware: Middleware<Context>) {
    this.middlewares.push(middleware);
    return this;
  }

  public callback() {
    if (!this.handler) {
      const fn = compose(...this.middlewares);
      this.handler = fn;
    }

    return (input: Input, output: Output) => {
      const context = this.createContext(input, output);
      return this.handler(context);
    };
  }

  public async execute(input: Input): Promise<Output> {
    if (!this._callback) {
      this._callback = this.callback();
    }

    const output = {} as Output;
    await this._callback(input, output);
    return output;
  }

  private createContext(input: Input, output: Output): Context {
    return {
      input,
      output,
    };
  }
}