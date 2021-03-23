import { Unsubscibe } from './types';

export function onPageShow(cb: Function): Unsubscibe {
  const handler = () => {
    if (document.visibilityState === 'visible') {
      return cb && cb();
    }
  };

  document.addEventListener('visibilitychange', handler);

  return () => {
    document.removeEventListener('visibilitychange', handler);
  };
}

export function onPageHide(cb: Function): Unsubscibe {
  const handler = () => {
    if (document.visibilityState === 'hidden') {
      return cb && cb();
    }
  };

  document.addEventListener('visibilitychange', handler);

  return () => {
    document.removeEventListener('visibilitychange', handler);
  };
}

export function isPageVisible(): boolean {
  return document.visibilityState === 'visible' || !document.hidden;
}

// alias
export const onShow = onPageShow;
export const onHide = onPageHide;
export const isVisible = isPageVisible;
