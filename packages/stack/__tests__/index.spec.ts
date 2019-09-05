import { Stack } from '../src/stack';

describe('stack', () => {
  it('works', () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.push(4);

    expect(stack.size()).toBe(4);
    expect(stack.peek()).toBe(4);

    expect(stack.pop()).toBe(4);
    expect(stack.size()).toBe(3);
    expect(stack.peek()).toBe(3);

    expect(stack.pop()).toBe(3);
    expect(stack.size()).toBe(2);
    expect(stack.peek()).toBe(2);

    expect(stack.pop()).toBe(2);
    expect(stack.size()).toBe(1);
    expect(stack.peek()).toBe(1);

    expect(stack.pop()).toBe(1);
    expect(stack.size()).toBe(0);
    expect(stack.peek()).toBe(undefined);

    expect(stack.pop()).toBe(undefined);
    expect(stack.size()).toBe(0);
    expect(stack.peek()).toBe(undefined);
  });

  it('capacity limit', () => {
    const stack1 = new Stack<number>(0);
    const stack2 = new Stack<number>(1);

    expect(() => stack1.push(1)).toThrow();
    expect(() => stack2.push(1)).not.toThrow();
    expect(() => stack2.push(1)).toThrow();
  });
});
