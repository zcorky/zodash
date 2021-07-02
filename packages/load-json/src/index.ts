import Cache from '@zodash/cache';
import { unfetch } from '@zodash/unfetch';
import { jsonp } from '@zodash/jsonp';

const cache = Cache.create();

export interface IOptions {
  cache?: boolean;
  jsonp?: boolean;
}

/**
 * dynamic load script
 *
 * @param url script url
 */
export function loadJSON(url: string, options?: IOptions) {
  const enableCache = options?.cache ?? true;

  return new Promise<void>((resolve, reject) => {
    if (enableCache && cache.get(url)) {
      return resolve(cache.get(url));
    }

    if (options.jsonp) {
      return jsonp(url).catch((error) => reject(error));
    }

    return unfetch(url)
      .then((response) => response.json())
      .catch((error) => reject(error));
  });
}
