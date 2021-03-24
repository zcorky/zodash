import * as globby from 'globby';

// import { CLASS_KEY } from '../decorators/provider';

export async function load(/* dirPath: string */) {
  const files = await globby('**/*.ts');
  const modules: any[] = [];

  for (const file of files) {
    if (/\.ts$/.test(file)) {
      modules.push(await loadModule(`./${file}`));
    }
  }

  return modules;
}

async function loadModule(path: string) {
  const module = require(path); // eslint-disable-line

  return module || module.default;
}
