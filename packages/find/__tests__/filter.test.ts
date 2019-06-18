"use strict";

import { deepEqual } from "@zcorky/deep-equal";
import { find } from "../src/find";

describe("@zodash/find", () => {
  it("same as builtin find", () => {
    const v = [
      { 'name': 'barney',  'age': 36, 'active': true },
      { 'name': 'fred',    'age': 40, 'active': false },
      { 'name': 'pebbles', 'age': 1,  'active': true }
    ];

    const fn = (user: any) => user.name === 'fred';
    const v1 = find(v, fn);
    const v2 = v.find(fn);

    expect(deepEqual(v1, v2)).toBeTruthy();
    expect(deepEqual(v1, { 'name': 'fred', 'age': 40, 'active': false })).toBeTruthy();
  });
});
