import { match } from '@zodash/match';
// import { string as isString } from '@zcorky/is';

const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;
// const ONE_WEEK = 7 * ONE_DAY;

function createMemoizedToStringMatch() {
  const handlers = {
    ms: (ms: number) => `${ms}ms`,
    s: (ms: number) => `${ms / ONE_SECOND}s`,
    m: (ms: number) => `${ms / ONE_MINUTE}m`,
    h: (ms: number) => `${ms / ONE_HOUR}h`,
    d: (ms: number) => `${ms / ONE_DAY}d`,
  };

  const key = (ms: number) => {
    if (ms < ONE_SECOND) {
      return 'ms';
    } else if (ms >= ONE_SECOND && ms < ONE_MINUTE) {
      return 's';
    } else if (ms >= ONE_MINUTE && ms < ONE_HOUR) {
      return 'm';
    } else if (ms >= ONE_HOUR && ms < ONE_DAY) {
      return 'h';
    } else {
      return 'd';
    }
  }

  return (data: number) => match(data, handlers, key);
}

// function createMemoizedToNumberMatch() {
//   const getValue = ()
//   const handlers = {
//     ms: (ms: number) => `${ms}ms`,
//     s: (ms: number) => `${ms / ONE_SECOND}s`,
//     m: (ms: number) => `${ms / ONE_MINUTE}m`,
//     h: (ms: number) => `${ms / ONE_HOUR}h`,
//     d: (ms: number) => `${ms / ONE_DAY}d`,
//   };

//   const key = (ms: string) => {
//     const 
//   }

//   return (data: string) => match(data, handlers, key);
// }

const toString = createMemoizedToStringMatch();

// const toNumber = createMemoizedToNumberMatch();

function ms(humanize: string): number
function ms(millisenconds: number): string
function ms(value: any): any {
  // if (isString(value)) {
  //   return toNumber(value);
  // }

  return toString(value);
}

export {
  ms,
};