import { NestRoutes, FlatRoutes } from './types';

/**
 * route flat
 * @param routes nest routes
 * @param parentPath the root path
 * @return flatten routes
 *
 * @example
 *  input:
 *    [{
 *      name: 'Dashboard',
 *      icon: 'dashboard',
 *      path: '/dashboard',
 *      children: [
 *        { name: 'analysis', path: '/dashboard/analysis', icon: 'fund' },
 *        { name: 'monitor', path: '/dashboard/monitor', icon: 'alert' },
 *        { name: 'workspace', path: '/dashboard/workspace', icon: 'appstore' },
 *      ],
 *    }]
 *
 *  output:
 *    [
 *      { path: '/dashboard', name: 'Dashboard', icon: 'dashboard' },
 *      { path: '/dashboard/analysis', name: '分析', icon: 'fund' },
 *      { path: '/dashboard/monitor', name: '监控', icon: 'alert' },
 *      { path: '/dashboard/workspace', name: '工作台', icon: 'appstore' },
 *    ]
 */
export function toFlat(routes: NestRoutes): FlatRoutes {
  return routes.reduce((all, route) => {
    const { children, ...routeWithoutChildren } = route;
    // const currentPath = [parentPath, path].join('/');

    all.push(routeWithoutChildren);

    if (children) {
      all = all.concat(toFlat(children));
    }

    return all;
  }, [] as FlatRoutes);
}
