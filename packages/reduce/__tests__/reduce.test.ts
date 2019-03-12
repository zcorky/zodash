"use strict";

import { deepEqual } from "@zcorky/deep-equal";
import { reduce } from "../src/reduce";

describe("@zodash/reduce", () => {
  it("same as builtin reduce", () => {
    const v = [{ x: 1, y: 2 }, { x: 3, y: 4 }];

    const v1 = reduce(v, (p, n) => p + n.x * n.y, 0);
    const v2 = v.reduce((p, n) => p + n.x * n.y, 0);

    expect(deepEqual(v1, v2)).toBeTruthy();
  });
});
