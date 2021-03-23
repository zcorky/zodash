import { TreeRoute, FlatRoutes, NestRoutes, Route } from './types';
import { toTree } from './to-tree';

export interface NestOptions {
  basePath?: string;
}

function flatChildren(treeNode: TreeRoute): FlatRoutes | undefined {
  if (!treeNode.children) return [];

  return Object.keys(treeNode.children)
    .map((path) => {
      const node = treeNode.children![path];

      if (!node.path) {
        return undefined as any;
      }

      const flattenNode = {
        ...node,
        children: flatChildren(node),
      };

      return flattenNode;
    })
    .filter((e) => !!e);
}

/**
 * route nest
 * @param routes flat routes
 * @returns nest routes
 *
 * @example
 *  input:
 *    [
 *      { path: '/dashboard', name: 'Dashboard', icon: 'dashboard' },
 *      { path: '/dashboard/analysis', name: 'Analysis', icon: 'fund' },
 *      { path: '/dashboard/monitor', name: 'Monitor', icon: 'alert' },
 *      { path: '/dashboard/workspace', name: 'Workspace', icon: 'appstore' },
 *    ]
 *
 *  output:
 *    [{
 *      name: 'Dashboard',
 *      icon: 'dashboard',
 *      path: 'dashboard',
 *      children: [
 *        { name: 'analysis', path: 'Analysis', icon: 'fund' },
 *        { name: 'monitor', path: 'Monitor', icon: 'alert' },
 *        { name: 'workspace', path: 'Workspace', icon: 'appstore' },
 *      ],
 *    }]
 */
export function toNest(routes: FlatRoutes, options?: NestOptions): NestRoutes {
  const treeRoute = toTree(routes);

  const basePath = (options && options.basePath) || '/';

  const basePaths = basePath.split('/').slice(1);

  if (basePaths[0] === '') {
    return flatChildren(treeRoute)!;
  }

  // let _treeRoute = treeRoute;
  // for (const bp of basePaths) {
  //   _treeRoute = _treeRoute.children[bp];

  //   if (!_treeRoute) return [];
  // }

  const _treeRoute = basePaths.reduce((rest, childKey) => {
    if (!rest.children[childKey]) return null;
    return rest.children[childKey];
  }, treeRoute);

  return flatChildren(_treeRoute);
}

export function traverseNest(
  routes: NestRoutes = [],
  callback: (route: Route) => void
) {
  routes.map((route) => {
    callback(route);

    traverseNest(route.children, callback);
  });
}
