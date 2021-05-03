// import * as fs from 'fs';
// import * as path from 'path';
// import Configuration from './core';

// declare global {
//   interface Config {
//     // @TODO K: V
//   }
// }

// export const config = new Configuration<Config>();

// function checkFilesSync(basedir: string = process.cwd()) {
//   const availableFiles = [
//     'config/config.default.json',
//     'config/config.local.json',
//     'config/config.prod.json',
//     //
//     'config/config.default.yml',
//     'config/config.local.yml',
//     'config/config.prod.yml',
//     //
//     'config/config.default.js',
//     'config/config.local.js',
//     'config/config.prod.js',
//     //
//     'config/config.default.json',
//     'config/config.local.json',
//     'config/config.prod.json',
//   ];
// }

// function loadSync() {
//   // 1. Check files
//   const { filepath, format } = {
//     filepath: '',
//     format: 'json',
//   };

//   // 2. Load Config
//   config.loadSync(async () => {
//     const rawConfig = fs.readFileSync(filepath, 'utf-8');

//     return {
//       x: 1,
//     };
//   });
// }

// export default config;
