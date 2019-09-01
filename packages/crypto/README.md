# schema

[![NPM version](https://img.shields.io/npm/v/@zcorky/schema.svg?style=flat)](https://www.npmjs.com/package/@zcorky/schema)
[![NPM quality](http://npm.packagequality.com/shield/%40zcorky%2Fschema.svg)](http://packagequality.com/#?package=@zcorky/schema)
[![Coverage Status](https://codecov.io/gh/zcorky/schema/branch/master/graph/badge.svg)](https://codecov.io/gh/zcorky/schema)
[![Dependencies](https://img.shields.io/david/zcorky/schema.svg?style=flat-square)](https://david-dm.org/zcorky/schema)
[![Build Status](https://travis-ci.com/zcorky/schema.svg?branch=master)](https://travis-ci.com/zcorky/schema)
[![Known Vulnerabilities](https://snyk.io/test/npm/@zcorky/schema/badge.svg?style=flat-square)](https://snyk.io/test/npm/@zcorky/schema)
[![NPM download](https://img.shields.io/npm/dm/@zcorky/schema.svg?style=flat-square)](https://www.npmjs.com/package/@zcorky/schema)
![license](https://img.shields.io/github/license/zcorky/schema.svg)
[![issues](https://img.shields.io/github/issues/zcorky/schema.svg)](https://github.com/zcorky/schema/issues)

> Object schema description language and validator for JavaScript objects, inspired by [hapijs/joi](https://github.com/hapijs/joi) and [hh54188/schemaor](https://github.com/hh54188/schemaor). It is written fully with Typescript.

* 🕒 Familiar `joi` API & patterns
* 💪 Node and Browser Support
* 🔥 Chainable
* :sparkle: TypeScript
* 🌐 I18n support (WIP)
* 🔌  Plugin System (WIP)

## Install

```
$ npm install @zcorky/schema
```

## Usage


```js
import * as Types from '@zcorky/schema';

const user = new Types.object({
  id: new Types.string().require(),
  nickname: new Types.string().require(),
  homepage: new Types.string(),
  age: new Types.number(),
  active: new Types.boolean(),
});

const validatedData = Types.validate(user, {
  id: '1',
  nickname: 'whatwewant',
  active: true,
});
```

### API
* See the detailed [API Reference](./docs).

### Relatived
* [joi]([https://github.com/iamkun/dayjs](https://github.com/hapijs/joi)) -  Object schema description language and validator for JavaScript objects..
* [schemaor](https://github.com/hh54188/schemaor)
* [ajv](https://github.com/epoberezkin/ajv) -The fastest JSON Schema validator for Node.js and browser.

## License

MIT © [Moeover](https://moeover.com)
