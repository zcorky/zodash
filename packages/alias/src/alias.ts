import { get } from '@zodash/get';
import { reduce } from '@zodash/reduce';
import { map } from '@zodash/map';
import { match } from '@zodash/match';
import {
  string as isString,
  number as isNumber,
  boolean as isBoolean,
  array as isArray,
} from '@zcorky/is';

export type Path = string;

export type Arrayable<T> = T | T[];

export type Mappings =
  | Arrayable<Path>
  | Arrayable<string>
  | Arrayable<number>
  | Arrayable<boolean>
  | Arrayable<{
      [key: string]: Mappings;
    }>;

function isStatic(v: any) {
  const keyGen = (d: any) => {
    if (isNumber(d)) {
      return 'number';
    } else if (isBoolean(d)) {
      return 'boolean';
    } else {
      return 'default';
    }
  };

  const handlers = {
    number: () => true,
    boolean: () => true,
    default: () => false,
  };

  return match(v, handlers, keyGen);
}

export function alias<T extends object, R>(data: T, mappings: Mappings): R {
  const keyGen = (m: Mappings) => {
    if (isStatic(mappings)) {
      return 'static';
    } else if (isString(mappings)) {
      return 'string';
    } else if (isArray(mappings)) {
      return 'array';
    } else {
      return 'object';
    }
  };

  const handlers = {
    // 0 static data
    static: (m: Mappings) => m,

    // 1 string
    string: (m: string) => get(data, m),

    // 2 array
    array: (m: Mappings) =>
      map(mappings as any, (one: any) => alias(data, one)) as any,

    // 3 object
    object: (m: Mappings) =>
      reduce(
        Object.keys(mappings),
        (all, key) => {
          all[key] = alias(data, mappings[key] as Mappings);
          return all;
        },
        {}
      ),
  };

  return match(mappings, handlers, keyGen) as R;
}
