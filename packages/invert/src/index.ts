import { reduce } from '@zodash/reduce';

const DEFAULT_BY = (value: any): string => {
  return value as string;
};

export function invert<
  V extends string | number | boolean | null | undefined
>(
  object: Record<string, V>,
  by: (v: V) => string = DEFAULT_BY,
): Record<string, string> {
  return reduce(
    object,
    (o, [k, v]) => {
      const _k = by(v);
      o[_k] = k;
      return o;
    },
    {} as Record<string, string>,
  );
}

export default invert;
