import { deepCopy } from '@zcorky/deep-copy';
import { NestRoutes, FlatRoutes, IndexRoutes } from './interface';
import { toNest } from './to-nest';
import { toIndex } from './to-index';
import { toFlat } from './to-flat';

// import { cloneDeep as deepCopy } from 'lodash';

export interface RoutesCache {
  flat: FlatRoutes;
  nest: NestRoutes;
  index: IndexRoutes;
}

export type RouteType = 'flat' | 'nest' | 'index';
export type Routes = FlatRoutes | NestRoutes | IndexRoutes;

export function create(type: RouteType, routes: Routes) {
  const cache = {} as RoutesCache;
  const _routes = deepCopy(routes);

  if (type === 'flat') {
    cache.flat = _routes as FlatRoutes;
    cache.nest = toNest(cache.flat);
    cache.index = toIndex(cache.flat);
  } else if (type === 'nest') {
    cache.nest = _routes as NestRoutes;
    cache.flat = toFlat(cache.nest);
    cache.index = toIndex(cache.flat);
  } else if (type === 'index') {
    cache.index = _routes as IndexRoutes;
    cache.flat = Object.values(cache.index);
    cache.nest = toNest(cache.flat);
  } else {
    throw new Error(`Invalid Type (${type}), must be flat, nest, or index`);
  }

  return cache;
}

export class RoutesBuilder {
  private cache: RoutesCache;

  constructor(public readonly type: RouteType, public readonly routes: Routes) {
    this.cache = create(type, routes);
  }

  flat() {
    return this.cache.flat;
  }

  nest() {
    return this.cache.nest;
  }

  index() {
    return this.cache.index;
  }
}