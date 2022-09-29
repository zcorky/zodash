import { Unsubscibe } from './types';

export function onPageShow(cb: Function): Unsubscibe {
  return onVisibleChange((visible) => {
    if (!!visible) {
      return cb?.();
    }
  });
}

export function onPageHide(cb: Function): Unsubscibe {
  return onVisibleChange((visible) => {
    if (!visible) {
      return cb?.();
    }
  });
}

export function isPageVisible(): boolean {
  return document.visibilityState === 'visible' || !document.hidden;
}

export function onVisibleChange(callback: (visible: boolean) => void) {
  const handler = () => {
    callback?.(isPageVisible());
  };

  document.addEventListener('visibilitychange', handler);

  return () => {
    document.removeEventListener('visibilitychange', handler);
  };
}

// alias
export const onShow = onPageShow;
export const onHide = onPageHide;
export const isVisible = isPageVisible;
