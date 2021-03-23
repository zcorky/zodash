import { compose, Middleware } from '../src/compose';

// compose vs pipe

describe('@zodash/compose', () => {
  it('middleware', () => {
    interface Context {
      state: any[];
    }

    class App {
      private middlewares: Middleware<Context>[] = [];
      private _context: Context = {
        state: [],
      } as Context;
      private _handler: Middleware<Context>;

      public use(middleware: Middleware<Context>) {
        this.middlewares.push(middleware);
      }

      public start() {
        const fn = compose(...this.middlewares);
        this._handler = fn;
      }

      public async emit() {
        await this._handler(this._context);
      }

      public get context() {
        return this._context;
      }
    }

    const app = new App();

    const m1 = async (context: Context, next: Function) => {
      context.state.push(1);
      await next();
      context.state.push(6);
    };

    const m2 = async (context: Context, next: Function) => {
      context.state.push(2);
      await next();
      context.state.push(5);
    };

    const m3 = async (context: Context, next: Function) => {
      context.state.push(3);
      await next();
      context.state.push(4);
    };

    app.use(m1);
    app.use(m2);
    app.use(m3);

    app.start();

    app.emit().then(() => {
      expect(app.context.state).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
