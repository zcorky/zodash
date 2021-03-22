
/**
 * Reduce an list of values to into a single value
 * 
 * @param value Array of value
 * @param fn Reduce function
 * @param initailValue InitialValue
 */
 export function reduce<R = any, T = any>(value: T[], fn: (previous: R | Partial<R>, current: T, index: number, origin: T[]) => any, initailValue: R | Partial<R>): R
 export function reduce<R = any, T extends object = {}>(value: T, fn: <K extends keyof T>(previous: R | Partial<R>, current: [K, T[K]], index: number, origin: [K, T[K]][]) => any, initailValue: R | Partial<R>): R
 export function reduce(value: any, fn: (previous: any, current: any, index: number, origin: any) => any, initailValue: any): any {
   if (Array.isArray(value)) {
     return value.reduce(fn, initailValue);
   }
 
   return entries(value).reduce(fn, initailValue);
 }
 
 function entries(obj: object) {
   if (Object.entries) {
     return Object.entries(obj);
   }
 
   return Object.keys(obj).map(key => ([key, obj[key]]));
 }