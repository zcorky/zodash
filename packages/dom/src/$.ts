import { I$S } from './types';

export const $: I$S = (selector) => {
  if (typeof selector === 'string') {
    return document.querySelector(selector);
  }

  return selector;
};
