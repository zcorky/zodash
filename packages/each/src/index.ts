import { reduce } from '@zodash/reduce';

export function each<T = any>(v: T[], fn: (item: T, index: number) => void): void
export function each<T extends object>(v: T, fn: <K extends keyof T>(item: [K, T[K]], index: number) => void): void
export function each(v: any, fn: (item: any, index: number) => void) {
  return reduce(v, (_, item, index) => fn(item, index));
}

export default each;
