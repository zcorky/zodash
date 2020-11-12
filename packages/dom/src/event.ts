import { $ } from './$';
import { El, Listener } from './types';

export function on($el: El, eventName: string, listener: Listener) {
  $($el).addEventListener(eventName, listener);

  return function _off() {
    off($el, eventName, listener);
  }
}

export function off($el: El, eventName: string, listener: Listener) {
  $($el).removeEventListener(eventName, listener);
}