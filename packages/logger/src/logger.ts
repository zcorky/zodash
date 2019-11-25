import { Onion, Context, Middleware } from '@zodash/onion';
import { moment, Moment } from '@zcorky/moment';
import { format } from '@zodash/format';

declare module '@zodash/onion' {
  interface Input {
    datetime?: Moment;
    level: LogLevel;
    message: string;
  }
}

export interface ILogger {
  log(message: string): void;
  info(message: string): void;
  error(message: string): void;
  warn(message: string): void;
  debug(message: string): void;
}

export interface Options {
  console?: boolean;
}

export enum LogLevel {
  log = 'log',
  info = 'info',
  error = 'error',
  warn = 'warn',
  debug = 'debug',
}

function formatMessage(name: string, date: Moment, message: string, level?: LogLevel) {
  return format(
    '{datetime} - {name} - {level} - {message}',
    { name, datetime: date.format('YYYY-MM-DD HH:mm:ss'), level: level.toUpperCase() || 'LOG', message },
  );
}

function formatPatternMessage(pattern: string, dataMap: any[]) {
  if (pattern.indexOf('%s') === -1) {
    return [pattern, ...dataMap].join(' ');
  }

  return pattern.replace(/%s/g, (_, index) => {
    return dataMap[index];
  });
}

export class Logger extends Onion implements ILogger {
  constructor(private readonly name: string, private readonly options?: Options) {
    super();
    
    this.options = options || {};
    this.use(this.useDateTime());
  }

  private useDateTime() {
    return async (ctx: Context, next: Function) => {
      ctx.input.datetime = moment();
      await next();
    };
  }

  public handle() {
    return async (ctx: Context) => {
      const input = ctx.input;
  
      if (this.options.console === false) {
        return ;
      }
  
      const message = formatMessage(this.name, input.datetime, input.message, input.level);
      switch (input.level) {
        case 'log':
          console.log(message);
          break;
        case 'info':
          console.info(message);
          break;
        case 'warn':
          console.warn(message);
          break;
        case 'error':
          console.error(message);
          break;
        case 'debug':
          console.debug(message);
          break;
      }
    };
  }

  public log(message: string, ...args: any[]) {
    if (args.length > 0) {
      message = formatPatternMessage(message, args);
    }

    this.execute({ level: LogLevel.log, message });
  }

  public info(message: string, ...args: any[]) {
    if (args.length > 0) {
      message = formatPatternMessage(message, args);
    }

    this.execute({ level: LogLevel.info, message });
  }

  public error(message: string, ...args: any[]) {
    if (args.length > 0) {
      message = formatPatternMessage(message, args);
    }

    this.execute({ level: LogLevel.error, message });
  }

  public warn(message: string, ...args: any[]) {
    if (args.length > 0) {
      message = formatPatternMessage(message, args);
    }

    this.execute({ level: LogLevel.warn, message });
  }

  public debug(message: string, ...args: any[]) {
    if (args.length > 0) {
      message = formatPatternMessage(message, args);
    }
    
    this.execute({ level: LogLevel.debug, message });
  }
}

export function getLogger(name: string, options?: Options) {
  return new Logger(name, options);
}