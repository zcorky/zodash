import * as fs from 'fs';

import { CLASS_KEY } from '../decorators/provider';

export async function load() {
  const files = await fs.promises.readdir('./');
  const modules = [];

  for (const file of files) {
    if (/\.ts$/.test(file)) {
      modules.push(await loadModule(`./${file}`));
    }
  }

  return modules;
}

async function loadModule(path: string) {
  const module = require(path);

  return module || module.default;
}