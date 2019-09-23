import { Onion, Context } from '../src/onion';

// compose vs pipe

declare module '../src/onion' {
  interface Request {
    state: number[];
  }
  interface Response {
    state: number[];
  }

  interface Context {
    state: number[];
  }
}

describe("@zodash/onion", () => {
  it('works', () => {
    // interface Context {
    //   state: any[];
    // }
    
    const app = new Onion();

    const m = async (ctx: Context, next: Function) => {
      ctx.state = ctx.response.state = ctx.request.state;
      await next();
    }

    const m1 = async (ctx: Context, next: Function) => {
      ctx.state.push(1);
      await next();
      ctx.state.push(6);
    };

    const m2 = async (ctx: Context, next: Function) => {
      ctx.state.push(2);
      await next();
      ctx.state.push(5);
    };

    const m3 = async (ctx: Context, next: Function) => {
      ctx.state.push(3);
      await next();
      ctx.state.push(4);
    };

    app.use(m)
    app.use(m1);
    app.use(m2);
    app.use(m3);

    // app.start();

    app.request({ state: [] }).then((response) => {
      expect(response.state).toEqual([1, 2, 3, 4, 5, 6]);
    });

    app.request({ state: [] }).then((response) => {
      expect(response.state).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
