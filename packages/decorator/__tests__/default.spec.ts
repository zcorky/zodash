import * as d from '../src/default';

// compose vs pipe

describe('@zodash/decorator to', () => {
  it('number', () => {
    class Controller {
      ctx = {
        query: {
          age: undefined as any,
        },
      };

      @d.default_(18)
      public age;
    }

    const c = new Controller();

    expect(c.age).toEqual(18);
  });
});
