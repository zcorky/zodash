import { debounce } from '@zodash/debounce';

import { $ } from './$';
import { on, off } from './event';
import { El, Selector, Listener, Unsubscibe, Position } from './types';

const DEFAULT_THRESHOLD = 50;

export function onScrollToTop(
  $element: El | Selector,
  cb: Listener,
  threshold: number = DEFAULT_THRESHOLD
): Unsubscibe {
  const $el = $($element);
  // @TODO should throw ?
  if (!$el) {
    throw new Error(`Cannot found element: ${$element}`);
  }

  const callback = debounce((e) => {
    const scrollTop = ($el as Element).scrollTop || ($el as Window).scrollY;

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
  $element: El | Selector,
  cb: Listener,
  threshold: number = DEFAULT_THRESHOLD
): Unsubscibe {
  const $el = $($element);
  // @TODO should throw ?
  if (!$el) {
    throw new Error(`Cannot found element: ${$element}`);
  }

  const callback = debounce((e) => {
    const scrollTop = ($el as Element).scrollTop || ($el as Window).scrollY;
    const scrollHeight =
      ($el as Element).scrollHeight || window.document.body.scrollHeight;

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
  const scrollHeight =
    ($el as Element).scrollHeight || window.document.body.scrollHeight;

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
