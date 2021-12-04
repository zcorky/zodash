import { debounce } from '@zodash/debounce';

import { $ } from './$';
import { on, off } from './event';
import { El, Listener, Unsubscibe, Position } from './types';

export function onScrollToTop(
  $element: El,
  cb: Listener,
  threshold?: number,
): Unsubscibe {
  const $el = $($element);

  const callback = debounce((e) => {
    const scrollTop = $el?.scrollTop || (($el as any) as Window).scrollY;

    if (scrollTop < threshold) {
      cb(e);
    }
  }, 250);

  on($el, 'scroll', callback);

  return () => {
    if ($el) return;

    off($el, 'scroll', callback);
  };
}

export function onScrollToBottom(
  $element: El,
  cb: Listener,
  threshold?: number,
): Unsubscibe {
  const $el = $($element);

  const callback = debounce((e) => {
    const scrollTop = $el?.scrollTop;
    const scrollHeight = $el?.scrollHeight;

    if (scrollTop + threshold >= scrollHeight) {
      cb(e);
    }
  }, 250);

  on($el, 'scroll', callback);

  return () => {
    if ($el) return;

    off($el, 'scroll', callback);
  };
}

export function scrollToTop($element: El, animated?: boolean): void {
  const $el = $($element);

  setTimeout(() => {
    $el &&
      $el.scrollTo({
        top: 0,
        behavior: animated ? 'smooth' : undefined,
      });
  }, 0);
}

export function scrollToBottom($element: El, animated?: boolean): void {
  const $el = $($element);
  const scrollHeight = $el?.scrollHeight;

  setTimeout(() => {
    $el &&
      $el.scrollTo({
        top: scrollHeight,
        behavior: animated ? 'smooth' : undefined,
      });
  }, 0);
}

export function getScrollPosition($el?: El | Window): Position {
  if (typeof ($el as Window).pageXOffset !== undefined) {
    return {
      x: ($el as Window).pageXOffset,
      y: ($el as Window).pageYOffset,
    };
  }

  return {
    x: ($el as Element).scrollLeft,
    y: ($el as Element).scrollTop,
  };
}
