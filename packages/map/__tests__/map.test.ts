"use strict";

import { deepEqual } from '@zcorky/deep-equal';
import { map } from '../src/map';

describe("map", () => {
  it("same as builtin map", () => {
    const v = [{ x: 1, y: 2 }, { x: 3, y: 4 }];
    const v1 = map(v, x => x.x + x.y);
    const v2 = v.map(x => x.x + x.y);

    expect(deepEqual(v1, v2)).toBeTruthy();
  });
});
