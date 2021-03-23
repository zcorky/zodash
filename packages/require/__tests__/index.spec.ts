import { requirejs } from '../src/require';

describe('@zodash/require', () => {
  it('works', () => {
    requirejs.register(
      '@browser/debug.js',
      function (exports, require, module) {
        module.exports = function () {
          return true;
        };
      }
    );

    const debug = requirejs('@browser/debug');

    expect(debug()).toBeTruthy();
  });

  it('deps', () => {
    requirejs.register('@browser/add.js', function (exports, require, module) {
      module.exports = (x: number, y: number) => {
        return x + y;
      };
    });

    requirejs.register('@browser/sub.js', function (exports, require, module) {
      module.exports = (x: number, y: number) => {
        return x - y;
      };
    });

    requirejs.register(
      '@browser/utils.js',
      function (exports, require, module) {
        exports.add = require('@browser/add');
        exports.sub = require('@browser/sub');
      }
    );

    const utils = requirejs('@browser/utils');

    expect(utils.add(1, 2)).toEqual(3);
    expect(utils.sub(1, 2)).toEqual(-1);
  });

  it('deps deep', () => {
    requirejs.register('@browser/c.js', function (exports, require, module) {
      module.exports = (x: number, y: number) => {
        return x + y;
      };
    });

    requirejs.register('@browser/b.js', function (exports, require, module) {
      module.exports = (x: number, y: number) => {
        return require('@browser/c')(x - 1, y);
      };
    });

    requirejs.register('@browser/a.js', function (exports, require, module) {
      module.exports = (x: number, y: number) => {
        return require('@browser/b')(x + 1, y);
      };
    });

    requirejs.register(
      '@browser/utils.js',
      function (exports, require, module) {
        module.exports = require('@browser/a');
      }
    );

    const utils = requirejs('@browser/utils');

    console.log(requirejs, utils);

    expect(utils(1, 2)).toEqual(3);
  });

  it('deps circle', () => {
    requirejs.register('@zodash/pick.js', function (exports, require, module) {
      module.exports = (object: any, keys: string[]) => {
        return keys.reduce((all, key) => {
          if (object[key]) {
            all[key] = object[key];
          }

          return all;
        }, {});
      };
    });

    requirejs.register('@zodash/omit.js', function (exports, require, module) {
      const pick = require('@zodash/pick');

      module.exports = (object: any, keys: string[]) => {
        const _keys = [];
        for (const key in object) {
          // console.log('key: ', key);
          if (!keys.includes(key)) {
            _keys.push(key);
          }
        }

        return pick(object, _keys);
      };
    });

    requirejs.register('@zodash/utils.js', function (exports, require, module) {
      exports.omit = require('@zodash/omit');
      exports.pick = require('@zodash/pick');
    });

    const utils = requirejs('@zodash/utils');

    expect(utils.pick({ x: 1, y: 2 }, ['x'])).toEqual({ x: 1 });
    expect(utils.omit({ x: 1, y: 2 }, ['x'])).toEqual({ y: 2 });
  });

  it('project app', () => {
    requirejs.register('./controllers', function (exports, require, module) {
      module.exports = {
        c1: () => {
          console.log('controller 1');
        },
        c2: () => {
          console.log('controller 1');
        },
      };
    });

    requirejs.register('./models', function (exports, require, module) {
      module.exports = {
        m1: () => {
          console.log('model 1');
        },
        m2: () => {
          console.log('model 1');
        },
      };
    });

    requirejs.register('./services', function (exports, require, module) {
      module.exports = {
        s1: () => {
          console.log('service 1');
        },
        s2: () => {
          console.log('service 1');
        },
      };
    });

    requirejs.register('./app.js', function (exports, require, module) {
      // console.log('xx:', exports, require, module);
      const controllers = require('./controllers');
      const models = require('./models');
      const services = require('./services');

      module.exports = {
        controllers,
        models,
        services,
      };
    });

    const app = requirejs('./app');

    expect(Object.keys(app)).toEqual(['controllers', 'models', 'services']);
    expect(Object.keys(app.controllers)).toEqual(['c1', 'c2']);
    expect(Object.keys(app.models)).toEqual(['m1', 'm2']);
    expect(Object.keys(app.services)).toEqual(['s1', 's2']);

    // console.log(requirejs);
  });
});
