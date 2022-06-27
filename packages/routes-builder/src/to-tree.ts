import { deepCopy } from '@zcorky/deep-copy';
import { TreeRoute, FlatRoutes } from './types';

function createTree(
  parentNode: TreeRoute,
  paths: string[],
  node: TreeRoute,
): void {
  if (!parentNode.children) {
    parentNode.children = {};
  }

  const [currentPath, ...restPath] = paths;

  // currentPath is the leaft
  if (restPath.length === 0) {
    if (parentNode.children[currentPath]) {
      parentNode.children[currentPath] = {
        ...node,
        ...parentNode.children[currentPath],
      };
      return;
    }

    parentNode.children[currentPath] = node;
    return;
  }

  if (!parentNode.children[currentPath]) {
    parentNode.children[currentPath] = {
      path: [parentNode?.path.slice(1) ?? '', currentPath].join('/'),
    } as any;
  }

  return createTree(parentNode.children[currentPath], restPath, node);
}

/**
 * route tree
 * @param routes flatten routes
 * @returns tree route
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
 *    {
 *      name: '',
 *      path: '/',
 *      icon: '',
 *      children: {
 *        dashboard: {
 *          name: 'Dashboard',
 *          icon: 'dashboard',
 *          path: '/dashboard',
 *          children: {
 *            analysis: { name: 'Analysis', path: '/dashboard/analysis', icon: 'fund' },
 *            monitor: { name: 'Monitor', path: '/dashboard/monitor', icon: 'alert' },
 *            workspace: { name: 'Workspace', path: '/dashboard/orkspace', icon: 'appstore' },
 *          },
 *        },
 *      },
 *    }
 */
export function toTree(routes: FlatRoutes): TreeRoute {
  const ROOT_NODE = {
    path: '/',
    name: 'Home',
    icon: 'home',
  };

  const clone = deepCopy(routes as any)! as any[];

  return clone.reduce<TreeRoute>((root, route) => {
    const paths = route.path.split('/').slice(1);

    createTree(root, paths, route);

    return root;
  }, ROOT_NODE as TreeRoute);
}
