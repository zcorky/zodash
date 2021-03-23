import Cache from '@zodash/cache';

const cache = Cache.create();

export interface IOptions {
  // Default: true, but for jsonp, should set false
  enableCache?: boolean;
}

/**
 * dynamic load script
 *
 * @param path script path
 */
export function loadScript(path: string, options?: IOptions) {
  const enableCache = options?.enableCache ?? true;

  return new Promise<void>((resolve, reject) => {
    if (enableCache && cache.get(path)) {
      return resolve();
    }

    const script = document.createElement('script');
    script.src = path;
    script.async = true;
    script.onerror = reject;
    script.onload = () => {
      // script.parentNode.removeChild(script);
      enableCache && cache.set(path, true);

      return resolve();
    };
    document.head.appendChild(script);
  });
}

/**
 * dynamic load script using ajax
 *
 * @param path script path
 */
export function usingAjax(path: string, options?: IOptions) {
  const enableCache = options?.enableCache ?? true;

  return new Promise<void>((resolve, reject) => {
    if (enableCache && cache.get(path)) {
      return resolve();
    }

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        const script = document.createElement('script');
        script.innerText = xhr.responseText;
        script.onerror = reject;
        // script.onload = () => {
        //   // script.parentNode.removeChild(script);
        //   resolve();
        // };
        document.head.appendChild(script);
        setTimeout(() => {
          enableCache && cache.set(path, true);

          return resolve();
        }, 0);
      }
    };
    xhr.onerror = reject;
    xhr.open('GET', path);
    xhr.send();
  });
}

/**
 * dynamic load script using fetch
 *
 * @param path script path
 */
export function usingFetch(path: string, options?: IOptions) {
  const enableCache = options?.enableCache ?? true;

  return new Promise<void>((resolve, reject) => {
    if (enableCache && cache.get(path)) {
      return resolve();
    }

    return fetch(path)
      .then((res) => res.text())
      .then((scriptText) => {
        const script = document.createElement('script');
        script.innerText = scriptText;
        script.onerror = reject;
        // script.onload = () => {
        //   // script.parentNode.removeChild(script);
        //   resolve();
        // };
        document.head.appendChild(script);
        setTimeout(() => {
          enableCache && cache.set(path, true);

          return resolve();
        }, 0);
      });
  });
}
