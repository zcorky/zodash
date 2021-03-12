import { I$S, El } from './types';

export const $: I$S = (selector: El) => {
  if (typeof selector === 'string') {
    return document.querySelector(selector);
  }

  return selector;
}