/**
 * dynamic load style
 *
 * @param path style path
 */
export function loadCss(path: string) {
  return new Promise<void>((resolve, reject) => {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = path;
    style.onerror = reject;
    style.onload = () => {
      // style.parentNode.removeChild(style);
      resolve();
    };
    document.head.appendChild(style);
  });
}

/**
 * dynamic load script using ajax
 *
 * @param path script path
 */
export function usingAjax(path: string) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        const style = document.createElement('style');
        style.innerText = xhr.responseText;
        style.onerror = reject;
        // style.onload = () => {
        //   // style.parentNode.removeChild(style);
        //   resolve();
        // };
        document.head.appendChild(style);
        setTimeout(resolve, 0);
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
export function usingFetch(path: string) {
  return new Promise((resolve, reject) => {
    return fetch(path)
      .then((res) => res.text())
      .then((styleText) => {
        const style = document.createElement('style');
        style.innerText = styleText;
        style.onerror = reject;
        // style.onload = () => {
        //   // style.parentNode.removeChild(style);
        //   resolve();
        // };
        document.head.appendChild(style);
        setTimeout(resolve, 0);
      });
  });
}

export default loadCss;
