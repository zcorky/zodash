export const defaultProvider = {
  log: console.log,
  debug: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error,
};

export enum LEVELS {
  debug = 10,
  info = 20,
  warn = 30,
  error = 50,
  silent = 80,
};

class Logger {
  private logLevel: LEVELS;
  private provider: typeof defaultProvider;

  constructor() {
    this.setLevel(LEVELS.info);
    this.setProvider(defaultProvider);
  }

  public log(message: string) {
    this.provider.log(message);
  }

  public debug(message: string) {
    if (this.showLevel(LEVELS.debug)) {
      this.provider.debug(message);
    }
  }

  public info(message: string) {
    if (this.showLevel(LEVELS.info)) {
      this.provider.info(message);
    }
  }

  public warn(message: string) {
    if (this.showLevel(LEVELS.warn)) {
      this.provider.warn(message);
    }
  }

  public error(message: string) {
    if (this.showLevel(LEVELS.error)) {
      this.provider.error(message);
    }
  }

  public setLevel(v: LEVELS) {
    this.logLevel = v;
  }

  public setProvider(provider: typeof defaultProvider) {
    this.provider = provider;
  }

  private showLevel(level: LEVELS) {
    const currentLogLevel = LEVELS[this.logLevel];

    if (currentLogLevel && currentLogLevel <= LEVELS[level]) {
      return true;
    }

    return false;
  }
}

export const logger = new Logger();