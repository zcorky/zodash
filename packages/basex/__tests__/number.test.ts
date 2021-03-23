import * as base62 from 'base62';
import num from '../src';
// import base62 from 'base62';

// const base62 = require('base62');
// const base62 = require('base62');

// console.log('xxx:', base62);

describe('@zodash/basex', () => {
  it('binary', () => {
    expect(num.binary(10)).toBe(parseInt(`${10}`, 10).toString(2));
    expect(num.binary(13)).toBe(parseInt(`${13}`, 10).toString(2));
    expect(num.binary(99)).toBe(parseInt(`${99}`, 10).toString(2));
    expect(num.binary(1024)).toBe(parseInt(`${1024}`, 10).toString(2));
    expect(num.binary(65535)).toBe(parseInt(`${65535}`, 10).toString(2));
  });

  it('hex', () => {
    expect(num.hex(10)).toBe(parseInt(`${10}`, 10).toString(16));
    expect(num.hex(13)).toBe(parseInt(`${13}`, 10).toString(16));
    expect(num.hex(99)).toBe(parseInt(`${99}`, 10).toString(16));
    expect(num.hex(1024)).toBe(parseInt(`${1024}`, 10).toString(16));
    expect(num.hex(65535)).toBe(parseInt(`${65535}`, 10).toString(16));
  });

  it('base62', () => {
    expect(num.base62(10)).toBe(base62.encode(10));
    expect(num.base62(13)).toBe(base62.encode(13));
    expect(num.base62(99)).toBe(base62.encode(99));
    expect(num.base62(1024)).toBe(base62.encode(1024));
    expect(num.base62(65535)).toBe(base62.encode(65535));
  });

  it('base36', () => {
    expect(num.base36(10)).toBe(parseInt(`${10}`, 10).toString(36));
    expect(num.base36(13)).toBe(parseInt(`${13}`, 10).toString(36));
    expect(num.base36(99)).toBe(parseInt(`${99}`, 10).toString(36));
    expect(num.base36(1024)).toBe(parseInt(`${1024}`, 10).toString(36));
    expect(num.base36(65535)).toBe(parseInt(`${65535}`, 10).toString(36));
  });

  it('basex(3)', () => {
    expect(num.basex('012', 10)).toBe(parseInt(`${10}`, 10).toString(3));
    expect(num.basex('012', 13)).toBe(parseInt(`${13}`, 10).toString(3));
    expect(num.basex('012', 99)).toBe(parseInt(`${99}`, 10).toString(3));
    expect(num.basex('012', 1024)).toBe(parseInt(`${1024}`, 10).toString(3));
    expect(num.basex('012', 65535)).toBe(parseInt(`${65535}`, 10).toString(3));
  });

  it('basex(13)', () => {
    expect(num.basex('0123456789abc', 10)).toBe(
      parseInt(`${10}`, 10).toString(13),
    );
    expect(num.basex('0123456789abc', 13)).toBe(
      parseInt(`${13}`, 10).toString(13),
    );
    expect(num.basex('0123456789abc', 99)).toBe(
      parseInt(`${99}`, 10).toString(13),
    );
    expect(num.basex('0123456789abc', 1024)).toBe(
      parseInt(`${1024}`, 10).toString(13),
    );
    expect(num.basex('0123456789abc', 65535)).toBe(
      parseInt(`${65535}`, 10).toString(13),
    );
  });

  it('basex', () => {
    expect(typeof num.basex(['文明', '民主', '和谐', '友善'], 10)).toBe(
      'string',
    );
    expect(typeof num.basex(['文明', '民主', '和谐', '友善'], 13)).toBe(
      'string',
    );
    expect(typeof num.basex(['文明', '民主', '和谐', '友善'], 99)).toBe(
      'string',
    );
    expect(typeof num.basex(['文明', '民主', '和谐', '友善'], 1024)).toBe(
      'string',
    );
    expect(typeof num.basex(['文明', '民主', '和谐', '友善'], 65535)).toBe(
      'string',
    );
  });
});
