export interface Mod {
  exports: any;
  id: string;
  path: string;
  filename: string;
  dirname: string;
  // paths: string[];
  // children: ModWrap[];
  loaded?: boolean;
  parent?: Mod;
  //
  fn: ModFn;
}

export interface ModFn {
  (exports: Mod['exports'], requirejs: Require, module: Mod, __filename?: string, __dirname?: string): void;
  // exports?: any;
}

export type RequireFn = (path: string) => any;

export interface Require {
  (path: string): any;
  modules: Record<string, Mod>;
  resolve(name: string): string;
  register(path: string, fn: ModFn): void;
  relative(path: string, parent: string): string;
  filename(parent: string): string;
  dirname(parent: string): string;
  _makeRequire(parent: string): RequireFn;
}

export const requirejs: Require = (path: string) => {
  const _path = requirejs.resolve(path);
  const _mod = requirejs.modules[_path];

  if (!_mod) throw new Error(`Cannot find module '${path}'`);
  if (!_mod.exports) {
    _mod.id = _path;
    _mod.path = _path;
    _mod.filename = requirejs.filename(path);
    _mod.dirname = requirejs.dirname(path);
    _mod.loaded = false;
    _mod.exports = {};

    //
    // _mod.call(_mod.exports, _mod, _mod.exports, requirejs.relative(_path));
    
    //
    // (function (exports, require, module, __filename, __dirname) {
    //
    // })(_mod.exports, require, _mod, requirejs.relative(_path), requirejs.dirname(_path));
    
    //
    _mod.fn.call(_mod.exports, _mod.exports, requirejs._makeRequire(_path), _mod, _mod.filename, _mod.dirname);

    _mod.loaded = true;
  }

  return _mod.exports;
}

requirejs.modules = {};

requirejs.resolve = (name: string) => {
  const base = name;
  const base_js = name + '.js';
  const index_js = name + '/index.js';
  
  return requirejs.modules[base_js] && base_js
    || requirejs.modules[index_js] && index_js
    || base;
}

requirejs.register = (path: string, fn: ModFn) => {
  // if (!requirejs.modules[path]) {
  //   requirejs.modules[path] = {} as any;
  // }

  // @TODO overwrite when register the same
  requirejs.modules[path] = {} as any;

  requirejs.modules[path].fn = fn;
}

requirejs.relative = (path: string, parent: string) => {
  if ('.' != path.charAt(0)) return path;

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

  return paths.join('/');
};

requirejs._makeRequire = (parent: string) => {
  return function require(path: string) {
    const relativePath = requirejs.relative(path, parent);
    
    return requirejs(relativePath);
  };
};

requirejs.filename = (path: string) => {
  return requirejs.resolve(path);
}

requirejs.dirname = (path: string) => {
  const _path = requirejs.resolve(path);

  const _paths = _path.split('/');
  _paths.pop();

  return _paths.join('/');
}

export default requirejs;