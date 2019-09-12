import { Onion } from '../src/onion';

// compose vs pipe

describe("@zodash/onion", () => {
  it('works', () => {
    interface Context {
      state: any[];
    }
    
    const app = new Onion();

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

    app.execute({ state: [] }).then((context) => {
      expect((context as any).state).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
