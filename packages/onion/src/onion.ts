import { compose, Middleware } from '@zodash/compose';

export interface IOnion {
  use(middleware: Middleware<Context>): void;
  start(): void;
  execute<R>(context: Context): Promise<R>;
}

export interface Context {

}

export class Onion {
  private middlewares: Middleware<Context>[] = [];
  private channel: Middleware<Context>;

  public use(middleware: Middleware<Context>) {
    this.middlewares.push(middleware);
  }

  public start() {
    const fn = compose(...this.middlewares);
    this.channel = fn;
  }

  public async execute(context: Context) {
    await this.channel(context);
    return context;
  }
}