import { debounce } from '@zodash/debounce';

export type Selector = string;

export type El = Element | Selector;

export type Listener = <T extends Event>(e?: T) => void;

export type Unsubscibe = () => void;

export type $S = (selector: Selector | Element) => Element;

export type Position = {
  x: number;
  y: number;
}

export interface DOMUtils extends $S {
  on($el: El, eventName: string, listener: Listener): void;
  off($el: El, eventName: string, listener: Listener): void;
  //
  onScrollToBottom($el: El, listener: Listener, threshold?: number): Unsubscibe;
  onScrollToTop($el: El, listener: Listener, threshold?: number): Unsubscibe;
  //
  scrollToTop($el: El, animated?: boolean): void;
  scrollToBottom($el: El, animated?: boolean): void;
  //
  copyToClipboard(text: string): Promise<void>;
  //
  onPageHide(cb: Function): Unsubscibe;
  onPageShow(cb: Function): Unsubscibe;
  isPageVisible(): boolean;
  //
  getScrollPosition($el?: El | Window): Position;
  isVisibleInViewport($el: El, fullVisible?: boolean): boolean;
  //
  currentURL(): string;
}

const $: DOMUtils = (selector) => {
  if (typeof selector === 'string') {
    return document.querySelector(selector);
  }

  return selector;
}

$.on = ($el, eventName, cb) => {
  $($el).addEventListener(eventName, cb);
}

$.off = ($el, eventName, cb) => {
  $($el).removeEventListener(eventName, cb);
}

$.onScrollToTop = ($element, cb, threshold = 50) => {
  const $el = $($element);
  
  const callback = debounce((e) => {
    const scrollTop = $el?.scrollTop;

    if (scrollTop < threshold) {
      cb(e);
    }
  }, 250);

  $el.addEventListener('scroll', callback);
  
  return () => {
    if ($el) return;
    
    $el.removeEventListener('scroll', callback);
  };
}

$.onScrollToBottom = ($element, cb, threshold = 50) => {
  const $el = $($element);

  const callback = debounce((e) => {
    const scrollTop = $el?.scrollTop;
    const scrollHeight = $el?.scrollHeight;

    if (scrollTop + threshold >= scrollHeight) {
      cb(e);
    }
  }, 250);

  $el.addEventListener('scroll', callback);

  return () => {
    if ($el) return;
    
    $el.removeEventListener('scroll', callback);
  };
}

$.scrollToTop = ($element, animated) => {
  const $el = $($element);
  
  setTimeout(() => {
    $el && $el.scrollTo({
      top: 0,
      behavior: animated ? 'smooth' : undefined,
    });
  }, 0);
}

$.scrollToBottom = ($element, animated) => {
  const $el = $($element);
  const scrollHeight = $el?.scrollHeight;
  
  setTimeout(() => {
    $el && $el.scrollTo({
      top: scrollHeight,
      behavior: animated ? 'smooth' : undefined,
    });
  }, 0);
}

// reference: https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
$.copyToClipboard = async function copyToClipboard(text: string) {
  if (!navigator.clipboard) {
    return await fallbackCopyTextToClipboard(text);
  }

  try {
    return await navigator.clipboard.writeText(text)
  } catch (error) {
    throw new Error('Copy Failed');
  }  
}

async function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    // var msg = successful ? 'successful' : 'unsuccessful';
    // console.log('Fallback: Copying text command was ' + msg);
    if (!successful) {
      throw new Error('Copy Failed');
    }
  } catch (err) {
    throw new Error('Copy Failed');
  } finally {
    document.body.removeChild(textArea);
  }
}

$.onPageHide = (cb: Function) => {
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

$.onPageShow = (cb: Function) => {
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

$.isPageVisible = () => {
  return document.visibilityState === 'visible' || !document.hidden;
}

$.getScrollPosition = ($el: Element | Window = window) => {
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

$.isVisibleInViewport = ($el: Element, fullVisible: boolean = false) {
  const { top, right, bottom, left } = $el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;

  if (fullVisible) {
    return top >= 0 && left >=0 && bottom <= innerHeight && right <= innerWidth;
  }

  const isVerticalMatch = (top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight);
  const isHorizontalMatch = (left > 0 && left < innerWidth) || (right > 0 && right < innerWidth);
  return isVerticalMatch && isHorizontalMatch;
}

$.currentURL = () => window.location.href;

export default $;
