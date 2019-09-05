import { delay } from '@zcorky/delay';
import { IQueue } from '@zodash/queue';
import { ITask, Status } from './task';

export async function parallelLimit(tasks: IQueue<ITask<any>>, limit: number, done: () => void) {
  let rest: number = limit;

  async function wait() {
    await delay(1000);
  }

  function each() {
    const task = tasks.dequeue();
    console.log('run task: ', task.name);
    rest -= 1;

    task.setStatus(Status.STARTED);
    
    task.start()
      .then(() => {
        task.setStatus(Status.RESOLVED);
      })
      .catch(() => {
        task.setStatus(Status.REJECTED);
      }).finally(() => {
        console.log(`task(${task.name}) done`);
        rest += 1;
      });
  }

  while(true) {
    if (rest === 0) {
      // parallel task run, not allow run new parallel task
      await wait();
    } else if (tasks.isEmpty()) {
      //  task queue empty and all task done
      if (rest === limit) {
        done();
      } else {
        // task queue empty, but still have task running
      }

      await wait();
    } else {
      // allow one task
      each();
    }
  }
}