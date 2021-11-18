import { deepEqual } from '@zcorky/deep-equal';
import { createMatchPattern } from '../src';

describe('@zodash/match', () => {
  it('match pattern', () => {
    interface Data {
      x: number;
      y: number;
      method: '+' | '-' | '*' | '/';
    }

    const pattern = createMatchPattern<Data, number>()
      .with(
        (data) => data.method === '+',
        (data) => data.x + data.y,
      )
      .with(
        (data) => data.method === '-',
        (data) => data.x - data.y,
      )
      .with(
        (data) => data.method === '*',
        (data) => data.x * data.y,
      )
      .with(
        (data) => data.method === '/',
        (data) => data.x / data.y,
      );

    expect(
      deepEqual(pattern.match({ method: '+', x: 1, y: 2 }), 3),
    ).toBeTruthy();
    expect(
      deepEqual(pattern.match({ method: '-', x: 1, y: 2 }), -1),
    ).toBeTruthy();
    expect(
      deepEqual(pattern.match({ method: '*', x: 1, y: 2 }), 2),
    ).toBeTruthy();
    expect(
      deepEqual(pattern.match({ method: '/', x: 1, y: 2 }), 0.5),
    ).toBeTruthy();
    expect(() =>
      pattern.match({ method: '//' as any, x: 1, y: 2 }),
    ).toThrowError('unhandled data');
  });

  it('match :when', () => {
    interface Data {
      x: number;
      y: number;
      method: '+' | '-' | '*' | '/';
    }

    const pattern = createMatchPattern<Data, number>()
      .when(
        (data) => data.method === '+',
        (data) => data.x + data.y,
      )
      .when(
        (data) => data.method === '-',
        (data) => data.x - data.y,
      )
      .when(
        (data) => data.method === '*',
        (data) => data.x * data.y,
      )
      .when(
        (data) => data.method === '/',
        (data) => data.x / data.y,
      );

    expect(
      deepEqual(pattern.match({ method: '+', x: 1, y: 2 }), 3),
    ).toBeTruthy();
    expect(
      deepEqual(pattern.match({ method: '-', x: 1, y: 2 }), -1),
    ).toBeTruthy();
    expect(
      deepEqual(pattern.match({ method: '*', x: 1, y: 2 }), 2),
    ).toBeTruthy();
    expect(
      deepEqual(pattern.match({ method: '/', x: 1, y: 2 }), 0.5),
    ).toBeTruthy();
    expect(() =>
      pattern.match({ method: '//' as any, x: 1, y: 2 }),
    ).toThrowError('unhandled data');
  });

  it('match pattern :fallback', () => {
    interface Data {
      x: number;
      y: number;
      method: '+' | '-' | '*' | '/';
    }

    const pattern = createMatchPattern<Data, number>()
      .with(
        (data) => data.method === '+',
        (data) => data.x + data.y,
      )
      .with(
        (data) => data.method === '-',
        (data) => data.x - data.y,
      )
      .with(
        (data) => data.method === '*',
        (data) => data.x * data.y,
      )
      .with(
        (data) => data.method === '/',
        (data) => data.x / data.y,
      )
      .fallback((data) => {
        throw new Error(`unknown calculator ${data.method}`);
      });

    expect(
      deepEqual(pattern.match({ method: '+', x: 1, y: 2 }), 3),
    ).toBeTruthy();
    expect(
      deepEqual(pattern.match({ method: '-', x: 1, y: 2 }), -1),
    ).toBeTruthy();
    expect(
      deepEqual(pattern.match({ method: '*', x: 1, y: 2 }), 2),
    ).toBeTruthy();
    expect(
      deepEqual(pattern.match({ method: '/', x: 1, y: 2 }), 0.5),
    ).toBeTruthy();
    expect(() =>
      pattern.match({ method: '//' as any, x: 1, y: 2 }),
    ).toThrowError(/unknown calculator/);
  });
});
