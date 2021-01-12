import { Queue } from '@zodash/queue';
import { Event } from '@zodash/event';
import { nextTick } from '@zodash/next-tick';

export type Callback<R> = (err: Error, result?: Result<R>) => void;

export type Done<R> = (results: Result<R>[]) => void;

export type Result<T> = T | Error;

export type ITask<R> = (() => Promise<R>) | ((cb: Callback<R>) => void);

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
  // const store = new Cache<number, { id: number, index: number, task: ITask<R> }>(Infinity);
  const emitter = new Event<{
    done(result: Result<R>[]): void;
  }>();

  const running = new Queue<any>(limit);
  const pending = new Queue<{ id: number, index: number, task: ITask<R> }>();
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
    if (running.isFull()) {
      return nextTick(next);
    }

    // no rest tasks
    if (pending.isEmpty()) {
      // no running tasks
      if (running.isEmpty()) {
        return nextTick(done);
      }

      return ;
    }

    const value = pending.dequeue();
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

  function run() {
    // empty
    if (!tasks.length) {
      return done();
    }

    tasks.forEach((task, index) => {
      const id = index;
  
      pending.enqueue({
        id,
        task,
        index,
      });
    });

    return nextTick(next);
  }

  run();

  if (!cb) {
    return new Promise<Result<R>[]>((resolve) => {
      emitter.on('done', resolve);
    });
  }
}
