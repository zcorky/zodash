import {
  number as isNumber,
  undef as isUndefined,
  null as isNull,
} from '@zcorky/is';
import type { Options } from './type';
import { DATA } from './constants';

export function getAgo(ago: Date | number) {
  const _ago = isNumber(ago) ? new Date(ago) : ago;
  return _ago;
}

export function getNow(options: Options) {
  return isUndefined(options?.now) || isNull(options?.now)
    ? new Date()
    : isNumber(options?.now)
    ? new Date(options.now)
    : options.now;
}

export function getPatternAndTimediff(now: Date, ago: Date) {
  const diff = now.getTime() - ago.getTime();
  let i = 0;
  while (diff / DATA[i].ceil > 1) {
    i++;
  }

  const _time = i === 0 ? diff : Math.floor(diff / DATA[i - 1].ceil);

  return {
    pattern: DATA[i].locale,
    diff: _time,
  };
}

export function getLanguage(options: Options) {
  let language = 'en_US';
  if (options?.language) {
    language = options.language.replace('-', '_');
  } else {
    if (!isUndefined(window)) {
      language = window.navigator?.language?.replace('-', '_');
    }
  }

  return language;
}
