import { IQueue } from '@zodash/queue';
import { nextTick } from '@zodash/next-tick';
import { ITask, Status } from './task';

export function parallelLimit(tasks: IQueue<ITask<any>>, limit: number, done: () => void) {
  let rest: number = limit;

  function poll() {
    if (rest === 0) {
      // if rest === 0, parallel task run, not allow run new parallel task
      nextTick(poll);
      return ;
    } else if (tasks.isEmpty()) {
      //  task queue empty and all task done
      if (rest === limit) {
        done();
      } else {
        // task queue empty, but still have task running
      }

      nextTick(poll);
      return ;
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

        nextTick(poll);
        return ;
      });
  }

  for (let i = 0; i < limit; ++i) {
    nextTick(poll);
  }
}