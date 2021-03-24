import { requirejs } from '../src/require';

describe('@zodash/require', () => {
  it('works', () => {
    requirejs.register('@browser/debug.js', (exports, require, module) => {
      module.exports = function () {
        return true;
      };
    });

    const debug = requirejs('@browser/debug');

    expect(debug()).toBeTruthy();
  });

  it('deps', () => {
    requirejs.register('@browser/add.js', (exports, require, module) => {
      module.exports = (x: number, y: number) => x + y;
    });

    requirejs.register('@browser/sub.js', (exports, require, module) => {
      module.exports = (x: number, y: number) => x - y;
    });

    requirejs.register('@browser/utils.js', (exports, require, module) => {
      exports.add = require('@browser/add');
      exports.sub = require('@browser/sub');
    });

    const utils = requirejs('@browser/utils');

    expect(utils.add(1, 2)).toEqual(3);
    expect(utils.sub(1, 2)).toEqual(-1);
  });

  it('deps deep', () => {
    requirejs.register('@browser/c.js', (exports, require, module) => {
      module.exports = (x: number, y: number) => x + y;
    });

    requirejs.register('@browser/b.js', (exports, _require, module) => {
      module.exports = (x: number, y: number) =>
        _require('@browser/c')(x - 1, y);
    });

    requirejs.register('@browser/a.js', (exports, _require, module) => {
      module.exports = (x: number, y: number) =>
        _require('@browser/b')(x + 1, y);
    });

    requirejs.register('@browser/utils.js', (exports, require, module) => {
      module.exports = require('@browser/a');
    });

    const utils = requirejs('@browser/utils');

    console.log(requirejs, utils);

    expect(utils(1, 2)).toEqual(3);
  });

  it('deps circle', () => {
    requirejs.register('@zodash/pick.js', (exports, require, module) => {
      module.exports = (object: any, keys: string[]) =>
        keys.reduce((all, key) => {
          if (object[key]) {
            all[key] = object[key];
          }

          return all;
        }, {});
    });

    requirejs.register('@zodash/omit.js', (exports, _require, module) => {
      const pick = _require('@zodash/pick');

      module.exports = (object: any, keys: string[]) => {
        const _keys: string[] = [];
        for (const key in object) {
          // console.log('key: ', key);
          if (!keys.includes(key)) {
            _keys.push(key);
          }
        }

        return pick(object, _keys);
      };
    });

    requirejs.register('@zodash/utils.js', (exports, require, module) => {
      exports.omit = require('@zodash/omit');
      exports.pick = require('@zodash/pick');
    });

    const utils = requirejs('@zodash/utils');

    expect(utils.pick({ x: 1, y: 2 }, ['x'])).toEqual({ x: 1 });
    expect(utils.omit({ x: 1, y: 2 }, ['x'])).toEqual({ y: 2 });
  });

  it('project app', () => {
    requirejs.register('./controllers', (exports, require, module) => {
      module.exports = {
        c1: () => {
          console.log('controller 1');
        },
        c2: () => {
          console.log('controller 1');
        },
      };
    });

    requirejs.register('./models', (exports, require, module) => {
      module.exports = {
        m1: () => {
          console.log('model 1');
        },
        m2: () => {
          console.log('model 1');
        },
      };
    });

    requirejs.register('./services', (exports, require, module) => {
      module.exports = {
        s1: () => {
          console.log('service 1');
        },
        s2: () => {
          console.log('service 1');
        },
      };
    });

    requirejs.register('./app.js', (exports, _require, module) => {
      // console.log('xx:', exports, _require, module);
      const controllers = _require('./controllers');
      const models = _require('./models');
      const services = _require('./services');

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
