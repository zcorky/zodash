import logger from './logger';
import debug from './debug';

import request from './request';
import date from './date';
import qs from './qs';
import event from './event';
import cookie from './cookie';
import fs from './fs';

import dom from './dom';
import url from './url';

// browser
import storage from './storage';
import device from './device';

import delay from './delay';
import uuid from './uuid';
import random from './random';
import is from './is';

import ms from './ms';

import object from './object';
import array from './array';
import string from './string';
import func from './func';

export interface ICollections {
  logger: typeof logger;
  debug: typeof debug;

  request: typeof request;
  date: typeof date;
  qs: typeof qs;
  event: typeof event;
  storage: typeof storage;
  device: typeof device;
  cookie: typeof cookie;
  fs: typeof fs;

  delay: typeof delay;
  uuid: typeof uuid;
  random: typeof random;
  is: typeof is;

  ms: typeof ms;

  object: typeof object;
  array: typeof array;
  string: typeof string;
  func: typeof func;

  dom: typeof dom;
  url: typeof url;

  register: typeof register;
  get: typeof get;

  /** Depreciated */
  use: typeof register;

  [key: string]: any;
}

function register<T = any>(key: string, value: T) {
  if (collections[key]) {
    throw new Error(`Doreamon cannot override ${key}`);
  }

  collections[key] = value;
}

function get<T = any>(key: string): T {
  if (!collections[key]) {
    throw new Error(`Doreamon cannot found ${key}`);
  }

  return collections[key];
}

const use = register;

export {
  logger,
  debug,
  request,
  date,
  qs,
  event,
  storage,
  device,
  cookie,
  fs,
  delay,
  uuid,
  random,
  is,
  ms,
  object,
  array,
  string,
  func,
  dom,
  url,
  //
  register,
  get,
  use,
};

export const collections: ICollections = {
  logger,
  debug,

  request,
  date,
  qs,
  event,
  storage,
  device,
  cookie,
  fs,

  delay,
  uuid,
  random,
  is,

  ms,

  object,
  array,
  string,
  func,

  dom,
  url,

  //
  register,
  get,
  //
  use,
};

export default collections;
