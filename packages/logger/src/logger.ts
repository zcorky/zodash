import { Onion, Context, Middleware } from '@zodash/onion';
import { moment, Moment } from '@zcorky/moment';
import { format } from '@zodash/format';

interface Input {
  // enable?: boolean;
  engine?: IEngine;
  datetime?: Moment;
  level: LogLevel;
  message: string[] | any[];
}

export interface ILogger {
  log(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  debug(message: string, ...args: any[]): void;
}

export interface IEngine {
  log(...args: any[]): void;
  info(...args: any[]): void;
  error(...args: any[]): void;
  warn(...args: any[]): void;
  debug(...args: any[]): void;
}

export interface Options {
  console?: boolean;
  nameMinLength?: number;
}

export enum LogLevel {
  log = 'log',
  info = 'info',
  error = 'error',
  warn = 'warn',
  debug = 'debug',
}

// we support pattern
//  %s
//  {VAR}
//  {0} {1}
function isPattern(value: string) {
  if (!value) return false;

  return /(%s|\{[^\s].*\})/.test(value);
}

function formatMessage(
  name: string,
  date: Moment,
  message: any[],
  level?: LogLevel,
) {
  const prefix = format('[{name}] {datetime} - {level} -', {
    name: name || 'COMMON',
    datetime: date.format('YYYY-MM-DD HH:mm:ss'),
    level: level?.toUpperCase() || 'LOG',
  });

  if (message?.length === 1) {
    return `${prefix} ${message[0]}`;
  }

  return [prefix, ...message];
}

function formatPatternMessage(pattern: string, dataMap: any[]) {
  // not pattern
  if (!isPattern(pattern)) {
    return [pattern, ...dataMap];
  }

  const message = pattern.replace(/%s/g, (_, index) => dataMap[index]);

  return [message];
}

export class Logger extends Onion<Input, any, any> implements ILogger {
  static _disableFn = null;
  static _defaultLogDir = null;

  static create(name: string, options?: Options) {
    return new Logger(name, options);
  }

  static setDisable(fn: () => boolean) {
    Logger._disableFn = fn;
  }

  static setDefaultLogDir(logDir: string) {
    this._defaultLogDir = logDir;
  }

  private logDir = null; // '/tmp/zodash.log';
  private logDate = moment().format('YYYY-MM-DD');
  private logFiles: Record<string, string> = {};

  constructor(
    private readonly name: string,
    private readonly options?: Options,
  ) {
    super();

    this.options = options || {};

    this.use(this.useDisable());
    this.use(this.useDefaulEngine());
    this.use(this.useDateTime());

    // default log dir
    if (Logger._defaultLogDir) {
      this.setLogDir(Logger._defaultLogDir);
    }
  }

  private useDefaulEngine(): Middleware<Context<Input, any, any>> {
    return async (ctx, next) => {
      ctx.input.engine = console;

      await next();
    };
  }

  private useDateTime(): Middleware<Context<Input, any, any>> {
    return async (ctx, next) => {
      ctx.input.datetime = moment();
      await next();
    };
  }

  private useDisable(): Middleware<Context<Input, any, any>> {
    return async (_ctx, next) => {
      const enable = !Logger._disableFn ? true : !Logger._disableFn();

      if (!enable) {
        return;
      }

      await next();
    };
  }

  public handle(): Middleware<Context<Input, any, any>> {
    return async (ctx) => {
      const { input } = ctx;

      if (this.options.console === false) {
        return;
      }

      const { engine } = input;
      const name = !this.options?.nameMinLength
        ? this.name
        : this.name.padEnd(this.options?.nameMinLength);

      const message = this.getLogMessage(
        input.datetime,
        input.message,
        input.level,
      );

      const isUseDevConsole = Array.isArray(message);

      if (!isUseDevConsole) {
        switch (input.level) {
          case 'log':
            engine?.log(message);
            break;
          case 'info':
            engine?.info(message);
            break;
          case 'warn':
            engine?.warn(message);
            break;
          case 'error':
            engine?.error(message);
            break;
          case 'debug':
            engine?.debug(message);
            break;
        }
      } else {
        switch (input.level) {
          case 'log':
            engine?.log(...message);
            break;
          case 'info':
            engine?.info(...message);
            break;
          case 'warn':
            engine?.warn(...message);
            break;
          case 'error':
            engine?.error(...message);
            break;
          case 'debug':
            engine?.debug(...message);
            break;
        }
      }
    };
  }

  public log(message: string, ...args: any[]) {
    const _message = formatPatternMessage(message, args);

    this.execute({ level: LogLevel.log, message: _message });
  }

  public info(message: string, ...args: any[]) {
    const _message = formatPatternMessage(message, args);

    this.execute({ level: LogLevel.info, message: _message });
  }

  public error(message: string, ...args: any[]) {
    const _message = formatPatternMessage(message, args);

    this.execute({ level: LogLevel.error, message: _message });
  }

  public warn(message: string, ...args: any[]) {
    const _message = formatPatternMessage(message, args);

    this.execute({ level: LogLevel.warn, message: _message });
  }

  public debug(message: string, ...args: any[]) {
    const _message = formatPatternMessage(message, args);

    this.execute({ level: LogLevel.debug, message: _message });
  }

  public getLogMessage(
    datetime: Moment,
    message: string[],
    level?: LogLevel,
  ) {
    const name = !this.options?.nameMinLength
      ? this.name
      : this.name.padEnd(this.options?.nameMinLength);

    return formatMessage(name, datetime, message, level);
  }

  private getLogFile = async function (level: LogLevel) {
    // eslint-disable-next-line
    const fs = require('fs');
    const today = moment().format('YYYY-MM-DD');
    const getLogeFileStream = () => {
      return fs.createWriteStream(
        `${this.logDir}/${level}.${this.logDate}.log`,
        { flags: 'a' },
      );
    };

    if (!this.logDir) {
      this.logDir = process.env.LOG_DIR || this.logDir;

      if (!fs.existsSync(this.logDir)) {
        await fs.promises.mkdir(this.logDir);
      }
    }

    if (!this.logFiles[level]) {
      this.logFiles[level] = getLogeFileStream();
    } else if (this.logDate !== today) {
      // for safe, close old fs handler
      if (this.logFiles[level]) {
        this.logFiles[level].close();
      }

      this.logDate = today;
      this.logFiles[level] = getLogeFileStream();
    }

    return this.logFiles[level];
  };

  public setLogDir(logDir: string) {
    this.logDir = logDir;

    this.use(async (ctx, next) => {
      await next();

      const logfile = await this.getLogFile(ctx.input.level);
      const logfileAll = await this.getLogFile('all' as any);

      let message = this.getLogMessage(
        ctx.input.datetime,
        ctx.input.message,
        ctx.input.level,
      );

      if (Array.isArray(message)) {
        const [prefix, ...rest] = message;
        const restText = rest
          .map((item) => {
            if (item instanceof Error) {
              // such
              //   backend: code | status
              //   axios: request | response
              const others = Object.keys(item).reduce((all, key) => {
                all[key] = item[key];
                return all;
              }, {});

              return {
                type: 'error',
                name: item.name,
                message: item.message,
                stack: item.stack,
                ...others,
              };
            }

            if (typeof item === 'object') {
              return JSON.stringify(item, null, 2);
            }

            return item;
          })
          .join(' ');

        message = `${prefix} - ${restText}`;
      }

      logfile.write(message + '\n');
      logfileAll.write(message + '\n');
    });
  }
}

export function getLogger(name: string, options?: Options) {
  return Logger.create(name, options);
}
