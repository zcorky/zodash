import moment, { Moment } from '@zcorky/moment';
import {
  SECONDS_A_MINUTE,
  SECONDS_A_HOUR,
  SECONDS_A_DAY,
} from '@zcorky/moment/lib/constants';

export interface ITask {
  name: string;
  isIntializing(): boolean; // 未开始
  isRuning(): boolean; // 进行中
  isResolved(): boolean; // 完成
  isRejected(): boolean; // 失败
  isFinished(): boolean; // 结束
  setStatus(status: Status): void;
  start(): Promise<any>;
  createdAt: Moment; // 任务创建时间
  startedAt: Moment; // 任务开始执行时间
  finishedAt: Moment; // 任务执行结束时间
  runningTime: Moment; // 任务运行时间
}

export enum Status {
  INITIAL = 'initial',
  STARTED = 'started',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}

export class Task<P> implements ITask {
  public createdAt: Moment = moment();

  public startedAt: Moment;

  public finishedAt: Moment;

  private status: Status = Status.INITIAL;

  public static create<P>(
    name: string,
    parameters: P,
    fn: (parameters: P) => Promise<void>,
  ) {
    return new Task(name, parameters, fn);
  }

  constructor(
    public readonly name: string,
    private readonly parameters: P,
    private fn: (parameters: P) => Promise<void>,
  ) {}

  public isIntializing() {
    return this.status === Status.INITIAL;
  }

  public isRuning() {
    return this.status === Status.STARTED;
  }

  public isResolved() {
    return this.status === Status.RESOLVED;
  }

  public isRejected() {
    return this.status === Status.REJECTED;
  }

  public isFinished() {
    return [Status.RESOLVED, Status.REJECTED].includes(this.status);
  }

  public setStatus(status: Status) {
    if ([Status.RESOLVED, Status.REJECTED].includes(status)) {
      this.finishedAt = moment();
    } else if (Status.STARTED === status) {
      this.startedAt = moment();
    }

    this.status = status;
  }

  public get runningTime() {
    return moment(this.finishedAt.valueOf() - this.startedAt.valueOf());
  }

  public toJSON() {
    return {
      name: this.name,
      parameters: this.parameters,
      fn: this.fn,
      status: this.status,
      createdAt: this.createdAt.toString(),
      startedAt: this.startedAt.toString(),
      finishedAt: this.finishedAt.toString(),
      runningTime: this.runningTime.toString(),
    };
  }

  private get createdAtString() {
    return this.createdAt.format('YYYY/MM/DD HH:mm:ss');
  }

  private get finishedAtString() {
    return this.finishedAt.format('YYYY/MM/DD HH:mm:ss');
  }

  private get runningTimeString() {
    const value = this.runningTime.valueOf() / 1000;
    if (value >= 1 && value < SECONDS_A_MINUTE) {
      return `${~~value}s`;
    }
    if (SECONDS_A_MINUTE <= value && value < SECONDS_A_HOUR) {
      return `${~~(value / SECONDS_A_MINUTE)}m`;
    }
    if (SECONDS_A_HOUR <= value && value < SECONDS_A_DAY) {
      return `${~~(value / SECONDS_A_HOUR)}h`;
    }
    if (SECONDS_A_DAY <= value) {
      return `${~~(value / SECONDS_A_DAY)}d`;
    }
    return value;
  }

  public toString() {
    return `[Task: ${this.name}] status: ${this.status}, runningTime: ${this.runningTimeString}, creatdedAt: ${this.createdAtString} finishedAt: ${this.finishedAtString}`;
  }

  public start() {
    return this.fn(this.parameters);
  }
}
