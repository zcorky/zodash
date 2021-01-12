import { generatee } from '@zodash/generatee';
import { Queue } from '@zodash/queue';
import { nextTick } from '@zodash/next-tick';

export type Callback<R> = (err: Error, result?: Result<R>) => void;

export type Done<R> = (results: Result<R>[]) => void;

export type Result<T> = T | Error;

export type ITask<R> = (cb: Callback<R>) => void;

// export interface Queue<T> {
//   enqueue(value: T): void;
//   dequeue(): T;
//   size(): number;
//   isEmpty(): boolean;
// }

// const nextTick = (callback: (...args: any) => void, ...args: any) => typeof setImmediate !== 'undefined' ? setImmediate(callback, ...args) : setTimeout(callback, 0, ...args);

// const poll = (queue: Queue<ITask<any>>) => {
//   if (queue.isEmpty()) {
//     nextTick(poll, queue);
//   }

//   const task = queue.dequeue();
//   task((err, result) => {
//     nextTick(poll, queue);
//   });
// };

// const poll = (generators: any) => {
//   if (generators.done()) {
//     nextTick(poll, generators);
//   }

//   const task = generators.next();
//   task((err, result) => {
//     nextTick(poll, generators);
//   });
// };

export function parallelLimit<R>(tasks: ITask<R>[], limit: number, cb?: Done<R>) {
  let running = new Queue();
  const generator = generatee(tasks.map((task, index) => ({ task, index })));
  const results: Result<R>[] = [];

  function done() {
    if (cb) {
      cb(results);
      cb = null;
    }
  }

  function next() {
    const data = generator.next();

    // no rest tasks
    if (data.done) {
      // no running tasks
      if (!running.isEmpty()) {
        return ;
      }

      return nextTick(done);
    }

    const value = data.value!;
    running.enqueue(value);

    const { task, index } = value;

    task(function _done(err, result) {
      results[index] = err || result;
      running.dequeue();

      // give err and result to next
      nextTick(next);
    });
  }

  function setup(limit: number) {
    for (let i = 0; i < limit; ++i) {
      nextTick(next);
    }
  }

  if (!tasks.length) {
    // empty
    return done();
  }

  // setup
  setup(limit);
}