export function groupBy<T>(collection: T[], iteratee: (v: T) => string) {
  return collection.reduce((prev, item) => {
    const key = iteratee(item);
    if (typeof prev[key] === 'undefined') { prev[key] = []; }
    prev[key].push(item);
    return prev;
  }, {} as Record<string, T[]>);
}