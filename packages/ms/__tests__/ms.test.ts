"use strict";

import { deepEqual } from "@zcorky/deep-equal";
import { map } from '@zodash/map';
import { ms } from "../src/ms";

describe("@zodash/alias", () => {
  const input = [
    10,
    1000,
    60 * 1000,
    60 * 60 * 1000,
    24 * 60 * 60 * 1000,
    365 * 24 * 60 * 60 * 1000,
  ];
  const output = [
    '10ms',
    '1s',
    '1m',
    '1h',
    '1d',
    '365d',
  ];

  it('number => string', () => {
    const t = ((e, index) => {
      expect(ms(e)).toBe(output[index]);;
    }) as any;

    map(input, t);
  });
});
