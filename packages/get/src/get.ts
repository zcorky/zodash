import { toPath } from '@zodash/to-path';
import { undefined as isUndef, array as isArray } from '@zcorky/is';

/**
 * Template Literal Types
 *  [v4.1, released in Nov 2020](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#template-literal-types)
 *
 * References:
 *  1. https://dev.to/tipsy_dev/advanced-typescript-reinventing-lodash-get-4fhe
 *  2. https://dev.to/pouja/making-lodash-function-get-type-safe-313o
 */
type GetIndexedField<T, K> = K extends keyof T
  ? T[K]
  : K extends `${number}`
  ? '0' extends keyof T
    ? undefined
    : number extends keyof T
    ? T[number]
    : undefined
  : undefined;

type FieldWithPossiblyUndefined<T, Key> =
  | GetFieldType<Exclude<T, undefined>, Key>
  | Extract<T, undefined>;

type IndexedFieldWithPossiblyUndefined<T, Key> =
  | GetIndexedField<Exclude<T, undefined>, Key>
  | Extract<T, undefined>;

export type GetFieldType<T, P> = P extends `${infer Left}.${infer Right}`
  ? Left extends keyof T
    ? FieldWithPossiblyUndefined<T[Left], Right>
    : Left extends `${infer FieldKey}[${infer IndexKey}]`
    ? FieldKey extends keyof T
      ? FieldWithPossiblyUndefined<
          IndexedFieldWithPossiblyUndefined<T[FieldKey], IndexKey>,
          Right
        >
      : undefined
    : undefined
  : P extends keyof T
  ? T[P]
  : P extends `${infer FieldKey}[${infer IndexKey}]`
  ? FieldKey extends keyof T
    ? IndexedFieldWithPossiblyUndefined<T[FieldKey], IndexKey>
    : undefined
  : undefined;

/**
 * Get the value at path of object.
 * If the resolved values is undefined, the defaultValue is returnted in its place.
 *
 * @param value The object to query.
 * @param path The path of the property to get.
 * @param defaultValue The value returned for undefined resolved values.
 */
export function get<
  Obj extends object,
  Path extends string,
  Default = GetFieldType<Obj, Path>,
>(
  value: Obj,
  path: Path,
  defaultValue?: Default,
): GetFieldType<Obj, Path> | Default {
  const _v = getValue(value, toPath(path));

  return !isUndef(_v) ? _v : defaultValue;
}

function getValue(
  parent: object | object[],
  paths: string[],
  currentIndex = 0,
) {
  if (isUndef(parent)) return undefined;

  const token = paths[currentIndex];
  const nextToken = paths[currentIndex + 1];

  // object
  if (token !== '[]') {
    if (isUndef(nextToken)) {
      return parent[token];
    }

    return getValue(parent[token], paths, currentIndex + 1);
  }

  // array
  if (!isArray(parent)) {
    return undefined;
  }

  if (isUndef(nextToken)) {
    return parent;
  }

  return (parent as any).map((v: any) =>
    getValue(v, paths, currentIndex + 1),
  );
}
