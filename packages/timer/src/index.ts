import { Event as Emitter } from '@zodash/event';
import moment, { Moment } from '@zcorky/moment';

export interface IOptions {
  interval?: number;
  deadlineAt?: Date;
}

export class Timer extends Emitter {
  private it: NodeJS.Timeout;
  private interval = this.options?.interval || 1000;

  public static create(options?: IOptions) {
    return new Timer(options);
  }

  constructor(private readonly options?: IOptions) {
    super();
  }

  public onUpdate(cb: <T extends Moment | number>(momentOrDiff: T) => void) {
    this.on('update', cb);
  }

  public start() {
    this.it = setTimeout(() => {
      const time = moment();
      if (this.options?.deadlineAt) {
        const diffTime = moment(this.options.deadlineAt).diff(time);

        this.emit('update', diffTime);
      } else {
        this.emit('update', time);
      }

      this.start();
    }, this.interval);
  }

  public stop() {
    if (this.it) {
      clearTimeout(this.it);
      this.it = null;
    }
  }
}

export default Timer;
