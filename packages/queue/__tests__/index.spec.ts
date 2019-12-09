import { Queue } from '../src/queue';

describe('queue', () => {
  it('works', () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.enqueue(4);

    expect(queue.size()).toBe(4);
    expect(queue.peek()).toBe(1);

    expect(queue.dequeue()).toBe(1);
    expect(queue.size()).toBe(3);
    expect(queue.peek()).toBe(2);

    expect(queue.dequeue()).toBe(2);
    expect(queue.size()).toBe(2);
    expect(queue.peek()).toBe(3);

    expect(queue.dequeue()).toBe(3);
    expect(queue.size()).toBe(1);
    expect(queue.peek()).toBe(4);

    expect(queue.dequeue()).toBe(4);
    expect(queue.size()).toBe(0);
    expect(queue.peek()).toBe(undefined);

    expect(() => queue.dequeue()).toThrow();
    expect(queue.size()).toBe(0);
    expect(queue.peek()).toBe(undefined);
  });

  it('capacity limit', () => {
    const queue1 = new Queue<number>(0);
    const queue2 = new Queue<number>(1);

    expect(() => queue1.enqueue(1)).toThrow();
    expect(() => queue2.enqueue(1)).not.toThrow();
    expect(() => queue2.enqueue(1)).toThrow();
    expect(() => queue2.dequeue()).not.toThrow();
    expect(() => queue2.enqueue(1)).not.toThrow();
  });

  it('isFull & isEmpty', () => {
    const queue1 = new Queue<number>(1);

    expect(queue1.isFull()).toBeFalsy();
    expect(queue1.isEmpty()).toBeTruthy();

    expect(() => queue1.enqueue(1)).not.toThrow();
    expect(queue1.isFull()).toBeTruthy();
    expect(queue1.isEmpty()).toBeFalsy();
  });

  it('contains', () => {
    const queue1 = new Queue<number>(10);

    queue1.enqueue(1);
    queue1.enqueue(2);
    queue1.enqueue(6);

    expect(queue1.contains(1)).toBeTruthy();
    expect(queue1.contains(2)).toBeTruthy();
    expect(queue1.contains(6)).toBeTruthy();
    expect(queue1.contains(3)).toBeFalsy();

    expect(queue1.contains(null)).toBeFalsy();
    expect(queue1.contains(undefined)).toBeFalsy();
    expect((queue1 as any).contains()).toBeFalsy();
  });

  it('support set/get capacity', () => {
    const queue1 = new Queue<number>(10);

    expect(queue1.getCapacity()).toEqual(10);
    queue1.setCompacity(6);
    expect(queue1.getCapacity()).toEqual(6);

    queue1.setCompacity(1);
    expect(queue1.getCapacity()).toEqual(1);

    expect(() => queue1.enqueue(1)).not.toThrow();
    expect(queue1.getCapacity()).toEqual(1);
    expect(() => queue1.enqueue(2)).toThrow();
    expect(queue1.getCapacity()).toEqual(1);
    expect(() => queue1.enqueue(6)).toThrow();
    expect(queue1.getCapacity()).toEqual(1);

    expect(queue1.contains(1)).toBeTruthy();
    expect(queue1.contains(2)).toBeFalsy();
    expect(queue1.contains(6)).toBeFalsy();
    expect(queue1.contains(3)).toBeFalsy();
    expect(queue1.getCapacity()).toEqual(1);

    expect(() => queue1.setCompacity(0)).not.toThrow();
    expect(queue1.getCapacity()).toEqual(0);

    expect(() => queue1.setCompacity(-1)).toThrow();
    expect(queue1.getCapacity()).toEqual(0);
  })
});
