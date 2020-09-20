import { debounce } from '@zodash/debounce';

export type Selector = string;

export type El = Element | Selector;

export type Listener = <T extends Event>(e?: T) => void;

export type Unsubscibe = () => void;

export type $S = (selector: Selector | Element) => Element;

export interface DOMUtils extends $S {
  on($el: El, eventName: string, listener: Listener): void;
  off($el: El, eventName: string, listener: Listener): void;
  //
  onScrollToBottom($el: El, listener: Listener, threshold?: number): Unsubscibe;
  onScrollToTop($el: El, listener: Listener, threshold?: number): Unsubscibe;
  //
  scrollToTop($el: El, animated?: boolean): void;
  scrollToBottom($el: El, animated?: boolean): void;
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

export default $;
