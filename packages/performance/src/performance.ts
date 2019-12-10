export async function time<Options>(fn: (options?: Options) => Promise<any>, options?: Options) {
  const start = new Date();
  await fn.call(null, options);
  return +new Date() - +start;
}