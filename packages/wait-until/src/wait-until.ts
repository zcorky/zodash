export function waitUntil(fn: (...args: any) => any, ms: number) {
  let it = setTimeout(fn, ms);

  return () => {
    clearTimeout(it);
    it = null;
  };
}