'use strict';

import { deepEqual } from '@zcorky/deep-equal';
import { get } from '@zodash/get';
import { alias } from '../src/alias';

describe('@zodash/alias', () => {
  let res;

  beforeAll(() => {
    res = {
      code: 200,
      message: null,
      data: {
        total: 100,
        data: [
          {
            x: 1,
            y: 2,
            z: {
              m: 'm',
              n: false,
              l: [
                { name: 'z', age: 190 },
                { name: 'v', age: 300 },
              ],
              o: [1, 2, 3],
            },
          },
          {
            x: 1,
            y: 2,
            z: {
              m: 'm',
              n: false,
              l: [
                { name: 'z', age: 190 },
                { name: 'v', age: 300 },
              ],
              o: [1, 2, 3],
            },
          },
        ],
      },
    };
  });

  it('simple object', () => {
    const response = {
      code: 200,
      message: null,
      data: {
        name: 'zero',
        age: 18,
        alive: true,
      },
    };

    const mappings = {
      name: 'data.name',
      age: 'data.age',
      alive: 'data.alive',
    };

    const expected = response.data;

    expect(alias(response, mappings)).toEqual(expected);
  });

  it('simple ugly object', () => {
    const response = {
      code: 200,
      message: null,
      data: {
        name: 'zero',
        attributes: [18, true],
      },
    };

    const mappings = {
      name: 'data.name',
      age: 'data.attributes.0',
      alive: 'data.attributes.1',
    };

    const expected = {
      name: 'zero',
      age: 18,
      alive: true,
    };

    expect(alias(response, mappings)).toEqual(expected);
  });

  it('string & object & array', () => {
    const mappings = {
      total: 'data.total',
      data: 'data.data',
    };

    const expected = {
      total: 100,
      data: [
        {
          x: 1,
          y: 2,
          z: {
            m: 'm',
            n: false,
            l: [
              { name: 'z', age: 190 },
              { name: 'v', age: 300 },
            ],
            o: [1, 2, 3],
          },
        },
        {
          x: 1,
          y: 2,
          z: {
            m: 'm',
            n: false,
            l: [
              { name: 'z', age: 190 },
              { name: 'v', age: 300 },
            ],
            o: [1, 2, 3],
          },
        },
      ],
    };

    expect(deepEqual(alias(res, mappings), expected)).toBeTruthy();
    expect(alias(res, mappings)).toEqual(expected);
  });

  it('nest', () => {
    const mappings = {
      total: 'data.total',
      data: res.data.data.map((e, i) => ({
        x: `data.data.${i}.x`,
        y: `data.data.${i}.y`,
        z: {
          m: `data.data.${i}.z.m`,
          n: `data.data.${i}.z.n`,
          l: res.data.data[i].z.l.map((ee, ii) => ({
            name: `data.data.${i}.z.l.${ii}.name`,
            age: `data.data.${i}.z.l.${ii}.age`,
          })),
          o: res.data.data[i].z.o.map(
            (eee, iii) => `data.data.${i}.z.o.${iii}`
          ),
        },
      })),
    };

    const expected = {
      total: 100,
      data: [
        {
          x: 1,
          y: 2,
          z: {
            m: 'm',
            n: false,
            l: [
              { name: 'z', age: 190 },
              { name: 'v', age: 300 },
            ],
            o: [1, 2, 3],
          },
        },
        {
          x: 1,
          y: 2,
          z: {
            m: 'm',
            n: false,
            l: [
              { name: 'z', age: 190 },
              { name: 'v', age: 300 },
            ],
            o: [1, 2, 3],
          },
        },
      ],
    };

    // console.log(JSON.stringify(mappings, null, 2));
    // console.log(JSON.stringify(alias(res, mappings), null, 2));
    // console.log(alias(res, mappings));

    expect(deepEqual(alias(res, mappings), expected)).toBeTruthy();
    expect(alias(res, mappings)).toEqual(expected);
  });

  it('nest with static number/boolean', () => {
    const mappings = {
      offset: 0,
      limit: 10,
      total: 'data.total',
      data: res.data.data.map((e, i) => ({
        x: `data.data.${i}.x`,
        y: `data.data.${i}.y`,
        z: {
          m: `data.data.${i}.z.m`,
          n: `data.data.${i}.z.n`,
          l: res.data.data[i].z.l.map((ee, ii) => ({
            name: `data.data.${i}.z.l.${ii}.name`,
            age: `data.data.${i}.z.l.${ii}.age`,
          })),
          o: res.data.data[i].z.o.map(
            (eee, iii) => `data.data.${i}.z.o.${iii}`
          ),
        },
      })),
    };

    const expected = {
      offset: 0,
      limit: 10,
      total: 100,
      data: [
        {
          x: 1,
          y: 2,
          z: {
            m: 'm',
            n: false,
            l: [
              { name: 'z', age: 190 },
              { name: 'v', age: 300 },
            ],
            o: [1, 2, 3],
          },
        },
        {
          x: 1,
          y: 2,
          z: {
            m: 'm',
            n: false,
            l: [
              { name: 'z', age: 190 },
              { name: 'v', age: 300 },
            ],
            o: [1, 2, 3],
          },
        },
      ],
    };

    expect(alias(res, mappings)).toEqual(expected);
  });

  it('nest get', () => {
    const _mappings = {
      total: 'data.total',
      data: res.data.data.map((e, i) => ({
        x: `data.data.${i}.x`,
        y: `data.data.${i}.y`,
        z: {
          m: `data.data.${i}.z.m`,
          n: `data.data.${i}.z.n`,
          l: res.data.data[i].z.l.map((ee, ii) => ({
            name: `data.data.${i}.z.l.${ii}.name`,
            age: `data.data.${i}.z.l.${ii}.age`,
          })),
          o: res.data.data[i].z.o.map(
            (eee, iii) => `data.data.${i}.z.o.${iii}`
          ),
        },
      })),
    };

    const mappings = {
      total: 'data.total',
      data: get(res, 'data.data', []).map((e, i) => ({
        x: `data.data.${i}.x`,
        y: `data.data.${i}.y`,
        z: {
          m: `data.data.${i}.z.m`,
          n: `data.data.${i}.z.n`,
          l: get(res, `data.data.${i}.z.l`, []).map((ee, ii) => ({
            name: `data.data.${i}.z.l.${ii}.name`,
            age: `data.data.${i}.z.l.${ii}.age`,
          })),
          o: get(res, `data.data.${i}.z.o`, []).map(
            (eee, iii) => `data.data.${i}.z.o.${iii}`
          ),
        },
      })),
    };

    expect(_mappings).toEqual(mappings);

    const expected = {
      total: 100,
      data: [
        {
          x: 1,
          y: 2,
          z: {
            m: 'm',
            n: false,
            l: [
              { name: 'z', age: 190 },
              { name: 'v', age: 300 },
            ],
            o: [1, 2, 3],
          },
        },
        {
          x: 1,
          y: 2,
          z: {
            m: 'm',
            n: false,
            l: [
              { name: 'z', age: 190 },
              { name: 'v', age: 300 },
            ],
            o: [1, 2, 3],
          },
        },
      ],
    };

    expect(alias(res, mappings)).toEqual(expected);
  });
});
