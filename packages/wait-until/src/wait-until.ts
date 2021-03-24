export function waitUntil(fn: (...args: any) => any, ms: number) {
  let it: NodeJS.Timeout | null = setTimeout(fn, ms);

  return () => {
    if (it) {
      clearTimeout(it);
      it = null;
    }
  };
}
