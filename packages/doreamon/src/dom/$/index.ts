export type Selector = string;

export type $S = (selector: Selector | Element) => Element;

export interface DOMUtils extends $S {
  on($el: Element | Selector, eventName: string, listener: <T extends Event>(e: T) => void): void;
  off($el: Element | Selector, eventName: string, listener: <T extends Event>(e: T) => void): void;
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

export default $;
