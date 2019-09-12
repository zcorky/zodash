export type Pipe = (data: any) => any;

/**
 * pipe function
 * 
 * @param fns componse functions
 */
export function pipe(...fns: Pipe[]) {
  return fns.reduceRight((prev, next) => {
    return (data: any) => prev(next(data));
  });
}