import { moment } from '@zcorky/moment';
import { Queue, IQueue } from '@zodash/queue';
import { Task, ITask } from './task';
import { parallelLimit } from './parallel-limit';

export type IStatus = 'initial' | 'running' | 'resolved' | 'rejected';

export interface ITaskManager {
  add(task: ITask<any>): void;
  add<P>(name: string, parameters: P, handler: (parameters: P) => Promise<void>): void
  start(): void;
  // pause(): void;
  // stop(): void;
  info(): any;
  isIdle(): boolean;
  isBusy(): boolean;
  // createdAt: Moment;
  // uptime: number;
  // idletime: number;
  // runningtime: number;
}


export class TaskManager implements ITaskManager {
  private readonly pendingQueue: IQueue<ITask<any>> = new Queue();

  private idle = true;
  private createdAt = moment();

  constructor(private readonly cocurrency: number = 1) {}

  public add(task: ITask<any>): void
  public add<P>(name: string, parameters: P, handler: (parameters: P) => Promise<void>): void
  public add(name: any, parameters?: any, handler?: any): void {
    let task = name;

    if (typeof name === 'string') {
      task = Task.create(name, parameters, handler);
    }

    this.pendingQueue.enqueue(task);
    return ;
  }

  public async start() {
    return parallelLimit(this.pendingQueue, this.cocurrency, () => {
      if (this.idle === false) {
        this.idle = true;
      }
    });
  }

  public info() {

  }

  public isIdle() {
    return this.idle;
  }

  public isBusy() {
    return !this.idle;
  }

  public uptime() {
    return moment().valueOf() - this.createdAt.valueOf();
  }

  public runningTime() {

  }
}

// var delay = require('@zcorky/delay').delay;
// var TaskManager = require('./src/task-manager').TaskManager;
// var Task = require('./src/task').Task

// var queue = new TaskManager(2);

// var exampleTask = async () => {
//   await delay(10000);
//   console.log('done);
// }

// var t1 = Task.create('task1', null, exampleTask);
// var t2 = Task.create('task2', null, exampleTask);
// var t3 = Task.create('task3', null, exampleTask);
// var t4 = Task.create('task4', null, exampleTask);
// var t5 = Task.create('task5', null, exampleTask);
// var t6 = Task.create('task6', null, exampleTask);

// queue.add(t1);
// queue.add(t2);
// queue.add(t3);
// queue.add(t4);
// queue.add(t5);
// queue.add(t6);

// queue.start();

// t1.toString();
// t2.toString();
// t3.toString();