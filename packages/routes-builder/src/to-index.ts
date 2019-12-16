import { FlatRoutes, IndexRoutes } from './interface';

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
 *    {
 *      '/dashboard': { path: '/dashboard', name: 'Dashboard', icon: 'dashboard' },
 *      '/dashboard/analysis': { path: '/dashboard/analysis', name: 'Analysis', icon: 'fund' },
 *      '/dashboard/monitor':  { path: '/dashboard/monitor', name: 'Monitor', icon: 'alert' },
 *      '/dashboard/workspace': { path: '/dashboard/workspace', name: 'Workspace', icon: 'appstore' },
 *    }
 */
export function toIndex(routes: FlatRoutes): IndexRoutes {
  return routes.reduce((all, route) => {
    all[route.path] = route;
    return all;
  }, {} as IndexRoutes);
}