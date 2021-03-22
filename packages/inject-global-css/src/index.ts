export function injectGlobalCSS(css: string) {
  const style = document.createElement('style');
  style.textContent = css;
  style.type = 'text/css';
  document.head.appendChild(style);
}

export default injectGlobalCSS;
