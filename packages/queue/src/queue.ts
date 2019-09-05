/**
 * 数据结构 - 队列的实现
 * 
 * Referer: https://medium.com/@_jmoller/javascript-data-structures-stacks-and-queues-ea877d72a5f9
 */

export interface IQueue<T> {
  enqueue(value: T): void;
  dequeue(): T | undefined;
  peek(): T | undefined;
  size(): number;
  contains(value: T): boolean;
  isEmpty(): boolean;
  isFull(): boolean;
}

export class Queue<T> implements IQueue<T> {
  private readonly storage: { [key: string]: T } = {};
  private head: number = 0;
  private tail: number = 0;

  constructor(private capacity: number = Infinity) {}

  public enqueue(value: T) {
    if (this.size() >= this.capacity) {
      throw new Error('Max capacity is alread reached.');
    }

    this.storage[this.tail] = value;
    this.tail += 1;
  }

  public dequeue() {
    const value = this.storage[this.head];
    delete this.storage[this.head];
    if (this.head < this.tail) {
      this.head += 1;
    }

    return value;
  }

  public peek() {
    return this.storage[this.head];
  }

  public size() {
    return this.tail - this.head;
  }

  public isEmpty() {
    return this.size() === 0;
  }

  public isFull() {
    return this.size() === this.capacity;
  }

  public contains(value: T) {
    if (!value) {
      return false;
    }

    for (let i = this.head; i < this.tail; i++) {
      if (this.storage[i] === value) return true;
    }

    return false;
  }
}