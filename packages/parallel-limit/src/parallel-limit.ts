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

const nextTick = (callback: (...args: any) => void, ...args: any) => typeof setImmediate !== 'undefined' ? setImmediate(callback, ...args) : setTimeout(callback, 0, ...args);

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
  let pending = tasks.length;
  let len = tasks.length;
  let next = limit;
  const results: Result<R>[] = [];

  function done() {
    if (cb) {
      cb(results);
      cb = null;
    }
  }

  function each(index: number, err: Error | null, result: Result<R>) {
    results[index] = err || result;
    
    if (--pending === 0) {
      // done();
      nextTick(done);
    } else if (next < len) {
      const key = next;
      const task = tasks[key];
      next += 1;
      task(function (err, result) {
        // give err and result to next
        // each(key, err, result);
        nextTick(each, key, err, result);
      });
    }
  }

  if (!pending) {
    // empty
    done();
  } else {
    tasks.some((task, i) => {
      task((err, result) => {
        // each(i, err, result)
        nextTick(each, i, err, result);
      });

      // early return
      if (i === limit - 1) {
        return true;
      }
    });
  }
}