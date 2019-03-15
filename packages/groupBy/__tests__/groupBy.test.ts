import { deepEqual } from '@zcorky/deep-equal';
import { groupBy } from "../src/groupBy";

describe("@zodash/groupBy", () => {
  it("float", () => {
    expect(deepEqual(
      groupBy([6.1, 4.2, 6.3], v => String(Math.floor(v))),
      { '4': [4.2], '6': [6.1, 6.3] },
    )).toBeTruthy();
  });

  it("string", () => {
    expect(deepEqual(
      groupBy(['one', 'two', 'three'], v => String(v.length)),
      { '3': ['one', 'two'], '5': ['three'] },
    )).toBeTruthy();
  });

  it("real world", () => {
    type Message = {
      from: string;
      to: string;
      content: string;
    };

    const collection = [{
      from: 'zero',
      to: 'master',
      content: 'hi, master, i am zero',
    }, {
      from: 'mike',
      to: 'master',
      content: 'hi, master, i am mike',
    }, {
      from: 'mike',
      to: 'tom',
      content: 'hi, tom, i am mike',
    }, {
      from: 'zero',
      to: 'tom',
      content: 'hi, tom, i am zero',
    }, {
      from: 'tom',
      to: 'zero',
      content: 'hi, zero, i am tom',
    }, {
      from: 'master',
      to: 'tom',
      content: 'hi, tom, i am master',
    }];

    expect(deepEqual(
      groupBy(collection, v => v.from),
      {
        'zero': [{
          from: 'zero',
          to: 'master',
          content: 'hi, master, i am zero',
        }, {
          from: 'zero',
          to: 'tom',
          content: 'hi, tom, i am zero',
        }],
        'mike': [{
          from: 'mike',
          to: 'master',
          content: 'hi, master, i am mike',
        }, {
          from: 'mike',
          to: 'tom',
          content: 'hi, tom, i am mike',
        }],
        'master': [{
          from: 'master',
          to: 'tom',
          content: 'hi, tom, i am master',
        }],
        'tom': [{
          from: 'tom',
          to: 'zero',
          content: 'hi, zero, i am tom',
        }],
      },
    )).toBeTruthy();

    expect(deepEqual(
      groupBy(collection, v => v.to),
      {
        'zero': [{
          from: 'tom',
          to: 'zero',
          content: 'hi, zero, i am tom',
        }],
        'tom': [{
          from: 'mike',
          to: 'tom',
          content: 'hi, tom, i am mike',
        }, {
          from: 'zero',
          to: 'tom',
          content: 'hi, tom, i am zero',
        }, {
          from: 'master',
          to: 'tom',
          content: 'hi, tom, i am master',
        }],
        'master': [{
          from: 'zero',
          to: 'master',
          content: 'hi, master, i am zero',
        }, {
          from: 'mike',
          to: 'master',
          content: 'hi, master, i am mike',
        }],
      },
    )).toBeTruthy();
  });
});
