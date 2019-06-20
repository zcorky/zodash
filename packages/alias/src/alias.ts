import { Mappings } from './alias';
import { get } from '@zodash/get';
import { reduce } from '@zodash/reduce';
import { map } from '@zodash/map';
import { match } from '@zodash/match';
import { string as isString, number as isNumber, boolean as isBoolean, array as isArray } from '@zcorky/is';

export type Path = string;

export type Arrayable<T> = T | T[];

export type Mappings = Arrayable<Path>
  | Arrayable<string>
  | Arrayable<number>
  | Arrayable<boolean>
  | Arrayable<{
    [key: string]: Mappings;
  }>

function isStatic(v: any) {
  const key = (d: any) => {
    if (isNumber(d)) {
      return 'number';
    } else if (isBoolean(d)) {
      return 'boolean';
    } else {
      return 'default';
    }
  };

  const handlers = {
    'number': () => true,
    'boolean': () => true,
    'default': () => false,
  };

  return match(v, handlers, key);
}

export function alias<T extends object, R>(data: T, mappings: Mappings): R {
  
  if (isStatic(mappings)) {
    // 0 static data
    return mappings as any as R;
  } else if (isString(mappings)) {
    // 1 string
    return get(data, mappings);
  } else if (isArray(mappings)) {
    // 2 array
    return map(mappings as any, (one: any) => alias(data, one)) as any;
  } 

  // 3 object
  return reduce(Object.keys(mappings), (all, key) => {
    all[key] = alias(data, mappings[key] as Mappings);
    return all;
  }, {}) as R;
}