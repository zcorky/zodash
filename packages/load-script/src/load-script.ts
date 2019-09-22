/**
 * dynamic load script
 * 
 * @param path script path
 */
export function loadScript(path: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = path;
    script.async = true;
    script.onerror = reject;
    script.onload = () => {
      // script.parentNode.removeChild(script);
      resolve();
    };
    document.head.appendChild(script);
  });
}

/**
 * dynamic load script using ajax
 * 
 * @param path script path
 */
export function usingAjax(path: string) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4){
        const script = document.createElement('script');
        script.innerText = xhr.responseText;
        script.onerror = reject;
        // script.onload = () => {
        //   // script.parentNode.removeChild(script);
        //   resolve();
        // };
        document.head.appendChild(script);
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
      .then(res => res.text())
      .then(scriptText => {
        const script = document.createElement('script');
        script.innerText = scriptText;
        script.onerror = reject;
        // script.onload = () => {
        //   // script.parentNode.removeChild(script);
        //   resolve();
        // };
        document.head.appendChild(script);
        setTimeout(resolve, 0);
      });
  });
}
