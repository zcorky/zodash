import { IQueue } from '@zodash/queue';
import { ITask, Status } from './task';

function nextTick(fn: (...args: any) => any, ...args: any) {
  setTimeout(fn, 0, ...args);
}

export function parallelLimit(tasks: IQueue<ITask<any>>, limit: number, done: () => void) {
  let rest: number = limit;

  function poll() {
    if (rest === 0) {
      // if rest === 0, parallel task run, not allow run new parallel task
      return nextTick(poll)
    } else if (tasks.isEmpty()) {
      //  task queue empty and all task done
      if (rest === limit) {
        done();
      } else {
        // task queue empty, but still have task running
      }

      return nextTick(poll)
    }

    // @1 if rest > 0, run another parallel task
    
    const task = tasks.dequeue();
    // console.log(`run task: ${task.name}, rest: ${rest}`);
    rest -= 1;

    task.setStatus(Status.STARTED);
    
    task.start()
      .then(() => {
        task.setStatus(Status.RESOLVED);
      })
      .catch(() => {
        task.setStatus(Status.REJECTED);
      }).finally(() => {
        // console.log(`task(${task.name}) done`);
        rest += 1;

        return nextTick(poll);
      });
  }

  for (let i = 0; i < limit; ++i) {
    nextTick(poll);
  }
}