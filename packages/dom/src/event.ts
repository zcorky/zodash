import { $ } from './$';
import { El, Listener } from './types';

export function on($el: El | Window, eventName: string, listener: Listener) {
  $($el).addEventListener(eventName, listener);

  return function _off() {
    off($el, eventName, listener);
  };
}

export function off($el: El | Window, eventName: string, listener: Listener) {
  $($el).removeEventListener(eventName, listener);
}

export function delegate(
  $el: El | Window,
  eventName: string,
  listener: Listener
) {
  $($el).addEventListener(eventName, listener, true);

  return function _off() {
    $($el).removeEventListener(eventName, listener, true);
  };
}
