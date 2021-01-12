import { Queue } from '@zodash/queue';
import { Event } from '@zodash/event';
import { Cache } from '@zodash/cache';
import { generatee } from '@zodash/generatee';
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
  const store = new Cache<number, { id: number, index: number, task: ITask<R> }>(Infinity);
  const emitter = new Event<{
    done(result: Result<R>[]): void;
  }>();

  const running = new Queue(limit);
  const results: Result<R>[] = [];

  const taskIds: number[] = [];
  tasks.forEach((task, index) => {
    const id = index;

    taskIds.push(id);
    store.set(id, { id, index, task });
  });
  
  
  const source = generatee(taskIds);

  function done() {
    if (cb) {
      cb(results);
      cb = null;
    } else {
      emitter.emit('done', results);
    }
  }

  function next() {
    if (running.isFull()) {
      return nextTick(next);
    }

    const data = source.next();

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

    const taskId = value;
    const { task, index } = store.get(taskId);

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

  function setup() {
    if (!tasks.length) {
      // empty
      return done();
    }

    return nextTick(next);
  }

  // setup
  setup();

  if (!cb) {
    return new Promise<Result<R>[]>((resolve) => {
      emitter.on('done', resolve);
    });
  }
}
