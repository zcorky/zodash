import { El } from './types';
import { $ } from './$';

/**
 * Set element style.
 * @param {element}
 * @param {string} name
 * @param {number | string} value
 */
export function setStyle<K extends keyof CSSStyleDeclaration>($element: El, name: K, value: CSSStyleDeclaration[K]) {
  const $node = $($element) as HTMLElement;

  const rValue: any = name === 'zIndex'
    ? value
    : typeof value === 'number'
      ? `${value}px`
      : value;

  if (($node.style[name]) === rValue) return false;

  $node.style[name] = rValue; // eslint-disable-line
}

/**
 * Set element styles batchly
 * @param $node HTMLElement
 * @param styles batch styles
 */
export function setStyles($element: El, styles: Partial<CSSStyleDeclaration>) {
  Object.keys(styles)
    .forEach((key: any) => {
      setStyle($element, key, styles[key]);
    });
}
