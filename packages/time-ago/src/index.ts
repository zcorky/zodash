import i18n, { t } from '@zodash/i18n';
import type { Options } from './type';
import { getAgo, getNow, getLanguage, getPatternAndTimediff } from './utils';

import * as zh_CN from './locales/zh_CN.json';
import * as zh_TW from './locales/zh_TW.json';
import * as en_US from './locales/en_US.json';

i18n.config({
  locales: {
    en_US,
    zh_CN,
    zh_TW,
  },
});

export function timeAgo(ago: Date | number, options?: Options) {
  const _ago = getAgo(ago);
  const _now = getNow(options);

  if (_ago <= new Date(1970, 1, 1, 0, 0, 0)) {
    throw new Error(`invalid ago date(${ago})`);
  }

  if (_now <= new Date(1970, 1, 1, 0, 0, 0)) {
    throw new Error(`invalid now date(${_now})`);
  }

  const { pattern, diff } = getPatternAndTimediff(_now, _ago);
  const language = getLanguage(options);
  i18n.setLocale(language);

  //
  return t(pattern, { n: diff });
}

export default timeAgo;
