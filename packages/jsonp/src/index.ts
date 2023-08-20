import { uuid } from '@zodash/uuid';
import { add } from '@zcorky/query-string/lib/add';
import { loadJs } from '@zodash/load-js';

export interface IOptions {
  /**
   * Custom Callback Param
   *  Default: callback
   *
   *  which is an query param, like /data?_callback=xxx
   *  here is `_callback`
   */
  callbackParam?: string;

  /**
   * Custom Callback Name
   *  Default: Random
   */
  callbackName?: string;

  /**
   * Timeout MiliSeconds
   *  Default: 10000
   */
  timeout?: number;
}

/**
 * Load JSON By JSONP (no cors)
 *
 * @param url JSONP URL
 * @param options JSONP Options
 */
export async function jsonp<D = any>(
  url: string,
  options?: IOptions,
): Promise<D> {
  const timeout = options?.timeout ?? 10000;
  const callbackParam = options?.callbackParam ?? 'callback';

  return new Promise(async (resolve, reject) => {
    try {
      // @S1 prepare callback
      const callbackName =
        options?.callbackName ||
        `_zodash_jsonp_callvack_${uuid().replace(/-/g, '_')}`;
      const callbackFn = (data: D) => {
        // clear callback
        delete window[callbackName];

        resolve(data);
      };
      window[callbackName] = callbackFn;

      // @S2 prepare url
      const _q_index = url.indexOf('?');
      const _prefix = _q_index === -1 ? url : url.slice(0, _q_index);
      const _search = url.slice(_q_index);
      const _url = `${_prefix}?${add(_search, {
        [callbackParam]: callbackName,
      })}`;

      // create timer
      let it = setTimeout(() => {
        reject(new Error('timeout'));
      }, timeout);

      // @S3 load JSONP
      await loadJs(_url, { enableCache: false });

      // clear timer
      if (it) {
        clearTimeout(it);
        it = null;
      }
    } catch (error) {
      reject(error);
    }
  });
}

export default jsonp;
