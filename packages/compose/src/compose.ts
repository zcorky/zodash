export type ComposeFunction = (data: any) => any;

/**
 * Compose function
 * 
 * @param fns componse functions
 */
export function compose(...fns: ComposeFunction[]) {
  return fns.reduceRight((prev, next) => {
    return (data: any) => prev(next(data));
  });
}