import { compose, Middleware } from '@zodash/compose';

export interface IOnion<Input, Output, State> {
  use(middleware: Middleware<Context<Input, Output, State>>): ThisType<any>;
  callback(): (
    req: Input,
    res: Output
  ) => Promise<Context<Input, Output, State>>;
  execute(input: Input): Promise<Output>;
}

export { Middleware };

export interface Context<Input, Output, State = any> {
  input: Input;
  state: State;
  output: Output;
}

export abstract class Onion<Input, Output, State>
implements IOnion<Input, Output, State> {
  private middlewares: Middleware<Context<Input, Output, State>>[] = [];

  private handler: Middleware<Context<Input, Output, State>>;

  private _callback: (
    input: Input,
    output: Output
  ) => Promise<Context<Input, Output, State>>;

  public use(middleware: Middleware<Context<Input, Output, State>>) {
    this.middlewares.push(middleware);
    return this;
  }

  public abstract handle(): Middleware<Context<Input, Output, State>>;

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

  private createContext(
    input: Input,
    output: Output,
  ): Context<Input, Output, State> {
    return {
      input,
      output,
      state: {},
    } as Context<Input, Output, State>;
  }
}
