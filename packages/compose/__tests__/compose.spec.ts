import { compose } from '../src/compose';

// compose vs pipe

describe("@zodash/compose", () => {
  it('calculate', () => {
    // const context = {};
    const sum = (data: { left: number, right: number }, next) => data.left + data.right;
    const pow = (x: number) => Math.pow(x, 2);
    const sub = (x: number) => x - 6;

    expect(compose(sum, pow, sub)({ left: 1, right: 2 })).toEqual(3);
  });

  it('actions', () => {
    interface Action {
      type: string;
      payload: string;
    }
    const result = [];
    const doTask1 = (action: Action) => {
      // do something
      result.push(1);
      return action;
    }

    const doTask2 = (action: Action) => {
      // do something
      result.push(2);
      return action;
    }

    const doTask3 = (action: Action) => {
      // do something
      result.push(3);
      return action;
    }

    const action = { type: 'setup', payload: { name: 'Zero' } };
    expect(compose(doTask1, doTask2, doTask3)(action)).toEqual(action);
    expect(result).toEqual([1, 2, 3]);
  });
});
