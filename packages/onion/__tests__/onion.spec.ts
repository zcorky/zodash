import { Onion, Context, Middleware } from '../src/onion';

// compose vs pipe

interface Input {
  state: number[];
}
interface Output {
  state: number[];
}

describe('@zodash/onion', () => {
  it('works', () => {
    // interface Context {
    //   state: any[];
    // }

    class App extends Onion<Input, Output, any> {
      public handle(): Middleware<Context<Input, Output, any>> {
        return async (ctx, next) => {
          ctx.output.state.push(4);
        };
      }
    }

    const app = new App();

    const m = async (ctx: Context<Input, Output, any>, next: Function) => {
      ctx.output.state = ctx.input.state;
      await next();
    };

    const m1 = async (ctx: Context<Input, Output, any>, next: Function) => {
      ctx.output.state.push(1);
      await next();
      ctx.output.state.push(1);
    };

    const m2 = async (ctx: Context<Input, Output, any>, next: Function) => {
      ctx.output.state.push(2);
      await next();
      ctx.output.state.push(2);
    };

    const m3 = async (ctx: Context<Input, Output, any>, next: Function) => {
      ctx.output.state.push(3);
      await next();
      ctx.output.state.push(3);
    };

    app.use(m);
    app.use(m1);
    app.use(m2);
    app.use(m3);

    // app.start();

    app.execute({ state: [] }).then((output) => {
      expect(output.state).toEqual([1, 2, 3, 4, 3, 2, 1]);
    });

    app.execute({ state: [] }).then((output) => {
      expect(output.state).toEqual([1, 2, 3, 4, 3, 2, 1]);
    });
  });

  it('can overrite ouput', (done) => {
    class App extends Onion<Input, Output, any> {
      public handle(): Middleware<Context<Input, Output, any>> {
        return async (ctx, next) => {
          ctx.output = { message: 'ouput overrite' } as any;
        };
      }
    }

    const app = new App();

    app.execute({ state: [] }).then((output) => {
      expect(output).toEqual({ message: 'ouput overrite' });

      done();
    });
  });
});
