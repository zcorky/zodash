import { generatee } from '@zodash/generatee';
import { Queue } from '@zodash/queue';
import { Event } from '@zodash/event';
import { nextTick } from '@zodash/next-tick';

export type Callback<R> = (err: Error, result?: Result<R>) => void;

export type Done<R> = (results: Result<R>[]) => void;

export type Result<T> = T | Error;

export type ITask<R> = (() => Promise<R>) | ((cb: Callback<R>) => void);

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

function toPromise<R>(fn: ITask<R>): () => Promise<R> {
  if (fn.length === 1) {
    return () => {
      return new Promise((resolve, reject) => {
        return fn.call(null, (error: any, result: any) => {
          if (error) {
            return reject(error);
          }

          return resolve(result);
        });
      });
    };
  }

  return fn as any;
}

export function parallelLimit<R>(tasks: ITask<R>[], limit: number): Promise<R>;
export function parallelLimit<R>(tasks: ITask<R>[], limit: number, cb: Done<R>): void;
export function parallelLimit<R>(tasks: ITask<R>[], limit: number, cb?: Done<R>) {
  const emitter = new Event<{
    done(result: Result<R>[]): void;
  }>();

  let running = new Queue();
  const generator = generatee(tasks.map((task, index) => ({ task, index })));
  const results: Result<R>[] = [];

  function done() {
    if (cb) {
      cb(results);
      cb = null;
    } else {
      emitter.emit('done', results);
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

    toPromise(task)()
      .then(function _done(result) {
        results[index] = result;
      })
      .catch(function _done(error) {
        results[index] = error;
      })
      .finally(() => {
        running.dequeue();
  
        // give err and result to next
        nextTick(next);
      });
  }

  function setup(limit: number) {
    if (!tasks.length) {
      // empty
      return done();
    }

    for (let i = 0; i < limit; ++i) {
      nextTick(next);
    }
  }

  // setup
  setup(limit);

  if (!cb) {
    return new Promise<Result<R>[]>((resolve) => {
      emitter.on('done', resolve);
    });
  }
}
