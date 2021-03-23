import {
  FlatRoutes, NestRoutes, RoutesBuilder, IndexRoutes,
} from '../src';

describe('builder', () => {
  it('from flat', () => {
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

    const builder = new RoutesBuilder('flat', flatRoutes);
    expect(builder.flat()).toEqual(flatRoutes);
    expect(builder.nest()).toEqual(nestRoutes);
    expect(builder.index()).toEqual(indexRoutes);
    expect(builder.flat()).toEqual(flatRoutes);
    expect(builder.nest()).toEqual(nestRoutes);
    expect(builder.index()).toEqual(indexRoutes);
    expect(builder.flat()).toEqual(flatRoutes);
    expect(builder.nest()).toEqual(nestRoutes);
    expect(builder.index()).toEqual(indexRoutes);
  });

  it('from nest', () => {
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

    const flatRoutes: FlatRoutes = [
      { path: '/user', name: '用户管理', icon: 'user' },
      { path: '/application', name: '应用管理', icon: 'appstore' },
    ];

    const indexRoutes: IndexRoutes = {
      '/user': { path: '/user', name: '用户管理', icon: 'user' },
      '/application': {
        path: '/application',
        name: '应用管理',
        icon: 'appstore',
      },
    };

    const builder = new RoutesBuilder('nest', nestRoutes);
    expect(builder.flat()).toEqual(flatRoutes);
    expect(builder.nest()).toEqual(nestRoutes);
    expect(builder.index()).toEqual(indexRoutes);
  });

  it('from index', () => {
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

    const builder = new RoutesBuilder('index', indexRoutes);
    expect(builder.flat()).toEqual(flatRoutes);
    expect(builder.nest()).toEqual(nestRoutes);
    expect(builder.index()).toEqual(indexRoutes);
    expect(builder.flat()).toEqual(flatRoutes);
    expect(builder.nest()).toEqual(nestRoutes);
    expect(builder.index()).toEqual(indexRoutes);
    expect(builder.flat()).toEqual(flatRoutes);
    expect(builder.nest()).toEqual(nestRoutes);
    expect(builder.index()).toEqual(indexRoutes);
  });
});
