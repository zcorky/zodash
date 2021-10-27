export interface Cancelable {
  cancel(): void;
}

export interface FnI<T extends any[], R> {
  (...args: T): R;
}

export interface FnO<T extends any[], R> extends FnI<T, R>, Cancelable {}

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will called after it stops being called for
 * N millisenconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'cancel'
 * that is a function which will cancel the timer to prevent previously scheduled executions.
 *
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @see https://github.com/component/debounce/blob/master/index.js
 * @see https://github.com/mqyqingfeng/Blog/issues/22
 *
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (default: 250)
 * @param {Boolean} whether to execute at the beginning (default: false)
 * @return {Function} function with cancel
 */
export function debounce<T extends any[], R>(
  fn: FnI<T, R>,
  wait = 250,
  immediate = false,
): FnO<T, R> {
  let timeout: NodeJS.Timer | null;
  let result: R;

  const debounced: FnO<T, R> = function (...args: any[]) {
    const context = this as any;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) result = fn.apply(context, args);
    } else {
      timeout = setTimeout(() => fn.apply(context, args), wait);
    }

    return result;
  };

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
}

export default debounce;
