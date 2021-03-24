import { number as isNumber } from '@zcorky/is';
import i18n, { t } from '@zodash/i18n';
import { DATA } from './constants';

import * as zh_CN from './locales/zh_CN.json';
import * as en_US from './locales/en_US.json';

export interface Options {
  /**
   * Now Date
   */
  now?: Date | number;

  /**
   * Navigator.language
   */
  language?: 'en-US' | 'zh-CN';
}

i18n.config({
  locales: {
    en_US,
    zh_CN,
  },
});

export function timeAgo(ago: Date | number, options?: Options) {
  const _ago = isNumber(ago) ? new Date(ago) : ago;
  const _now = !options?.now
    ? new Date()
    : isNumber(options.now)
    ? new Date(options.now)
    : options.now;

  const diff = _now.getTime() - _ago.getTime();
  let i = 0;
  while (diff / DATA[i].ceil > 1) {
    i++;
  }

  const _time = i === 0 ? diff : Math.floor(diff / DATA[i - 1].ceil);

  //
  if (options?.language) {
    i18n.setLocale(options.language.replace('-', '_'));
  } else {
    i18n.setLocale(window.navigator?.language?.replace('-', '_'));
  }

  //
  return t(DATA[i].locale, { n: _time });
}

export default timeAgo;
