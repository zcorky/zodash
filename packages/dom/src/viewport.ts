import { $ } from './$';
import { El } from './types';

export function isVisibleInViewport(
  $element: El,
  fullVisible?: boolean,
): boolean {
  const $el = $($element);
  const {
    top, right, bottom, left,
  } = $el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;

  if (fullVisible) {
    return (
      top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth
    );
  }

  const isVerticalMatch = (top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight);
  const isHorizontalMatch = (left > 0 && left < innerWidth) || (right > 0 && right < innerWidth);
  return isVerticalMatch && isHorizontalMatch;
}
