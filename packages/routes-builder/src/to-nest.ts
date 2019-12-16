import { TreeRoute, FlatRoutes, NestRoutes } from './interface';
import { toTree } from './to-tree';

function flatChildren(treeNode: TreeRoute): FlatRoutes | undefined {
  if (!treeNode.children) return [];

  return Object.keys(treeNode.children)
    .map(path => {
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
    .filter(e => !!e);
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
export function toNest(routes: FlatRoutes): NestRoutes {
  const treeRoute = toTree(routes);

  return flatChildren(treeRoute)!;
}