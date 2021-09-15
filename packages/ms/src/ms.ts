import { match } from '@zodash/match';
import { string as isString } from '@zcorky/is';

const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;
const ONE_WEEK = 7 * ONE_DAY;

const REG = /^((?:\d+)?\.?\d+)+(ms|s|m|h|d|w)$/;

function createMemoizedToStringMatch() {
  const parts: string[] = [];

  const handlers = {
    ms: (ms: number) => `${ms}ms`,
    s: (ms: number) => `${ms / ONE_SECOND}s`,
    m: (ms: number) => `${ms / ONE_MINUTE}m`,
    h: (ms: number) => `${ms / ONE_HOUR}h`,
    d: (ms: number) => `${ms / ONE_DAY}d`,
    unknown: () => undefined,
  };

  const key = (ms: number) => {
    if (ms > 365 * ONE_DAY) {
      return 'y';
    }

    if (ms >= ONE_DAY) {
      return 'd';
    }

    if (ms >= ONE_HOUR) {
      return 'h';
    }

    if (ms >= ONE_MINUTE) {
      return 'm';
    }

    if (ms >= ONE_SECOND) {
      return 's';
    }

    if (ms >= 0) {
      return 'ms';
    }

    return 'unknown';
  };

  return (data: number) => match(data, handlers, key);
}

function createMemoizedToNumberMatch() {
  const handlers = {
    ms: (ms: string) => +ms.replace('ms', ''),
    s: (ms: string) => +ms.replace('s', '') * ONE_SECOND,
    m: (ms: string) => +ms.replace('m', '') * ONE_MINUTE,
    h: (ms: string) => +ms.replace('h', '') * ONE_HOUR,
    d: (ms: string) => +ms.replace('d', '') * ONE_DAY,
    w: (ms: string) => +ms.replace('w', '') * ONE_WEEK,
    unknown: () => undefined,
  };

  const key = (ms: string) => {
    const matched = ms.match(REG);
    if (!matched) {
      return 'unknown';
    }

    return matched[2];
  };

  return (data: string) => match(data, handlers, key);
}

const toString = createMemoizedToStringMatch();

const toNumber = createMemoizedToNumberMatch();

function ms(humanize: string): number;
function ms(millisenconds: number): string;
function ms(value: any): any {
  if (isString(value)) {
    return toNumber(value);
  }

  return toString(value);
}

export { ms };
