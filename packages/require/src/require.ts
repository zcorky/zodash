export interface Mod {
  exports: any;
}

export interface ModWrap {
  (module: Mod, exports: Mod['exports'], requirejs: Require): void;
  exports?: any;
}

export type RequireFn = (path: string) => any;

export interface Require {
  (path: string): any;
  modules: Record<string, ModWrap>;
  resolve(path: string): string;
  register(path: string, fn: ModWrap): void;
  relative(parent: string): RequireFn;
}

export const requirejs: Require = (path: string) => {
  const _path = requirejs.resolve(path);
  const _mod = requirejs.modules[_path];

  if (!_mod) throw new Error(`Cannot find module '${path}'`);
  if (!_mod.exports) {
    _mod.exports = {};
    _mod.call(_mod.exports, _mod, _mod.exports, requirejs.relative(_path));
  }

  return _mod.exports;
}

requirejs.modules = {};

requirejs.resolve = (path: string) => {
  const base = path;
  const base_js = path + '.js';
  const index_js = path + '/index.js';
  
  return requirejs.modules[base_js] && base_js
    || requirejs.modules[index_js] && index_js
    || base;
}

requirejs.register = (path: string, fn: ModWrap) => {
  requirejs.modules[path] = fn;
}

requirejs.relative = (parent: string) => {
  return (path: string) => {
    if ('.' != path.charAt(0)) return requirejs(path);

    const paths = parent.split('/');
    const segs = path.split('/');
    paths.pop();

    for (const seg of segs) {
      if ('..' === seg) {
        paths.pop();
      } else if ('.' != seg) {
        paths.push(seg);
      }
    }

    return requirejs(paths.join('/'));
  };
};

export default requirejs;