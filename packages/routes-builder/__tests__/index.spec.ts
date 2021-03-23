import {
  FlatRoutes,
  NestRoutes,
  toFlat,
  toIndex,
  toTree,
  toNest,
  IndexRoutes,
} from '../src';

describe('routes-builder', () => {
  const nestRoutes: NestRoutes = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      path: '/dashboard',
      children: [
        {
          name: '分析',
          path: '/dashboard/analysis',
          icon: 'fund',
          children: [],
        },
        {
          name: '监控',
          path: '/dashboard/monitor',
          icon: 'alert',
          children: [],
        },
        {
          name: '工作台',
          path: '/dashboard/workspace',
          icon: 'appstore',
          children: [],
        },
      ],
    },
    {
      name: '用户管理',
      icon: 'user',
      path: '/user',
      children: [],
    },
    {
      name: '应用管理',
      icon: 'appstore',
      path: '/application',
      children: [],
    },
  ];

  const flatRoutes: FlatRoutes = [
    { path: '/dashboard', name: 'Dashboard', icon: 'dashboard' },
    { path: '/dashboard/analysis', name: '分析', icon: 'fund' },
    { path: '/dashboard/monitor', name: '监控', icon: 'alert' },
    { path: '/dashboard/workspace', name: '工作台', icon: 'appstore' },
    { path: '/user', name: '用户管理', icon: 'user' },
    { path: '/application', name: '应用管理', icon: 'appstore' },
  ];

  const indexRoutes: IndexRoutes = {
    '/dashboard': { path: '/dashboard', name: 'Dashboard', icon: 'dashboard' },
    '/dashboard/analysis': {
      path: '/dashboard/analysis',
      name: '分析',
      icon: 'fund',
    },
    '/dashboard/monitor': {
      path: '/dashboard/monitor',
      name: '监控',
      icon: 'alert',
    },
    '/dashboard/workspace': {
      path: '/dashboard/workspace',
      name: '工作台',
      icon: 'appstore',
    },
    '/user': { path: '/user', name: '用户管理', icon: 'user' },
    '/application': {
      path: '/application',
      name: '应用管理',
      icon: 'appstore',
    },
  };

  const treeRoutes = {
    name: 'Home',
    path: '/',
    icon: 'home',
    children: {
      dashboard: {
        name: 'Dashboard',
        icon: 'dashboard',
        path: '/dashboard',
        children: {
          analysis: { name: '分析', path: '/dashboard/analysis', icon: 'fund' },
          monitor: { name: '监控', path: '/dashboard/monitor', icon: 'alert' },
          workspace: {
            name: '工作台',
            path: '/dashboard/workspace',
            icon: 'appstore',
          },
        },
      },
      user: { name: '用户管理', icon: 'user', path: '/user' },
      application: { name: '应用管理', icon: 'appstore', path: '/application' },
    },
  };

  it('to flat', () => {
    expect(toFlat(nestRoutes)).toEqual(flatRoutes);
  });

  it('to index', () => {
    expect(toIndex(flatRoutes)).toEqual(indexRoutes);
  });

  it('to tree', () => {
    expect(toTree(flatRoutes)).toEqual(treeRoutes);
  });

  it('to nest', () => {
    expect(toNest(flatRoutes)).toEqual(nestRoutes);
  });
});

describe('routes-builder without some parent, children will be ignore', () => {
  const flatRoutes: FlatRoutes = [
    { path: '/dashboard/analysis', name: '分析', icon: 'fund' },
    { path: '/dashboard/monitor', name: '监控', icon: 'alert' },
    { path: '/dashboard/workspace', name: '工作台', icon: 'appstore' },
    { path: '/user', name: '用户管理', icon: 'user' },
    { path: '/user/notfound/a', name: '用户管理', icon: 'user' },
    { path: '/user/notfound/b', name: '用户管理', icon: 'user' },
    { path: '/user/notfound/c/notfound/@', name: '用户管理', icon: 'user' },
    { path: '/user/notfound/c/notfound/@@', name: '用户管理', icon: 'user' },
    { path: '/application', name: '应用管理', icon: 'appstore' },
  ];

  const nestRoutes: NestRoutes = [
    {
      name: '用户管理',
      icon: 'user',
      path: '/user',
      children: [],
    },
    {
      name: '应用管理',
      icon: 'appstore',
      path: '/application',
      children: [],
    },
  ];

  const indexRoutes: IndexRoutes = {
    '/dashboard/analysis': {
      path: '/dashboard/analysis',
      name: '分析',
      icon: 'fund',
    },
    '/dashboard/monitor': {
      path: '/dashboard/monitor',
      name: '监控',
      icon: 'alert',
    },
    '/dashboard/workspace': {
      path: '/dashboard/workspace',
      name: '工作台',
      icon: 'appstore',
    },
    '/user': { path: '/user', name: '用户管理', icon: 'user' },
    '/user/notfound/a': {
      path: '/user/notfound/a',
      name: '用户管理',
      icon: 'user',
    },
    '/user/notfound/b': {
      path: '/user/notfound/b',
      name: '用户管理',
      icon: 'user',
    },
    '/user/notfound/c/notfound/@': {
      path: '/user/notfound/c/notfound/@',
      name: '用户管理',
      icon: 'user',
    },
    '/user/notfound/c/notfound/@@': {
      path: '/user/notfound/c/notfound/@@',
      name: '用户管理',
      icon: 'user',
    },
    '/application': {
      path: '/application',
      name: '应用管理',
      icon: 'appstore',
    },
  };

  const treeRoutes = {
    name: 'Home',
    path: '/',
    icon: 'home',
    children: {
      dashboard: {
        // name: 'Dashboard',
        // icon: 'dashboard',
        // path: '/dashboard',
        children: {
          analysis: { name: '分析', path: '/dashboard/analysis', icon: 'fund' },
          monitor: { name: '监控', path: '/dashboard/monitor', icon: 'alert' },
          workspace: {
            name: '工作台',
            path: '/dashboard/workspace',
            icon: 'appstore',
          },
        },
      },
      user: {
        name: '用户管理',
        icon: 'user',
        path: '/user',
        children: {
          notfound: {
            children: {
              a: { path: '/user/notfound/a', name: '用户管理', icon: 'user' },
              b: { path: '/user/notfound/b', name: '用户管理', icon: 'user' },
              c: {
                children: {
                  notfound: {
                    children: {
                      '@': {
                        path: '/user/notfound/c/notfound/@',
                        name: '用户管理',
                        icon: 'user',
                      },
                      '@@': {
                        path: '/user/notfound/c/notfound/@@',
                        name: '用户管理',
                        icon: 'user',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      application: { name: '应用管理', icon: 'appstore', path: '/application' },
    },
  };

  it('to nest', () => {
    expect(toNest(flatRoutes)).toEqual(nestRoutes);
    // console.log(JSON.stringify(toNest(flatRoutes), null, 2));
  });

  it('to index', () => {
    expect(toIndex(flatRoutes)).toEqual(indexRoutes);
    // console.log(JSON.stringify(toIndex(flatRoutes), null, 2));
  });

  it('to tree', () => {
    expect(toTree(flatRoutes)).toEqual(treeRoutes);
  });

  // it('to flat', () => {
  //   expect(toFlat(nestRoutes)).toEqual(flatRoutes);
  // });
});
