/**
 * 数据结构 - 栈的实现
 * 
 * Referer: https://medium.com/@_jmoller/javascript-data-structures-stacks-and-queues-ea877d72a5f9
 */

export interface IStack<T> {
  // /**
  //  * Constructor
  //  * 
  //  * @param capacity limit stack
  //  */
  // new (capacity?: number): any;
  
  /**
   * add an element to stack
   * 
   * @param element value
   */
  push(element: T): void;
  
  /**
   * remove and return the last element of stack
   */
  pop(): T | undefined;

  /**
   * return the last element of stack
   */
  peek(): T | undefined;

  /**
   * this size of stack
   */
  size(): number;
}

export class Stack<T> implements IStack<T>{
  private readonly storage: T[] = [];
  private count: number = 0;

  constructor(private readonly capacity: number = Infinity) {}

  public push(element: T) {
    if (this.count >= this.capacity) {
      throw new Error('Max capacity is already reached.');
    }
    
    this.count += 1;
    return this.storage.push(element);
  }

  public pop() {
    if (this.count > 0) {
      this.count -= 1;
      return this.storage.pop();
    }
  }

  public peek() {
    return this.storage[this.size() - 1];
  }

  public size() {
    return this.count;
  }
}