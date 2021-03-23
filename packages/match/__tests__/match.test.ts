'use strict';

import { deepEqual } from '@zcorky/deep-equal';
import { match } from '../src/match';

describe('@zodash/match', () => {
  it('common', () => {
    interface Data {
      x: number;
      y: number;
      method: '+' | '-' | '*' | '/';
    }

    const handlers = {
      '+': (data: Data) => data.x + data.y,
      '-': (data: Data) => data.x - data.y,
      '*': (data: Data) => data.x * data.y,
      '/': (data: Data) => data.x / data.y,
    };

    expect(
      deepEqual(
        match({ method: '+', x: 1, y: 2 }, handlers, (d) => d['method']),
        3
      )
    ).toBeTruthy();
    expect(
      deepEqual(
        match({ method: '-', x: 1, y: 2 }, handlers, (d) => d['method']),
        -1
      )
    ).toBeTruthy();
    expect(
      deepEqual(
        match({ method: '*', x: 1, y: 2 }, handlers, (d) => d['method']),
        2
      )
    ).toBeTruthy();
    expect(
      deepEqual(
        match({ method: '/', x: 1, y: 2 }, handlers, (d) => d['method']),
        0.5
      )
    ).toBeTruthy();
    expect(
      deepEqual(
        match({ method: '/', x: 1, y: 2 }, handlers, (d) => d['methodd']),
        undefined
      )
    ).toBeTruthy();
  });

  it('redux/reducer', () => {
    interface Action {
      type: '+' | '-' | '*' | '/';
      payload: {
        x: number;
        y: number;
      };
    }

    const handlers = {
      '+': (action: Action) => action.payload.x + action.payload.y,
      '-': (action: Action) => action.payload.x - action.payload.y,
      '*': (action: Action) => action.payload.x * action.payload.y,
      '/': (action: Action) => action.payload.x / action.payload.y,
    };

    expect(
      deepEqual(
        match(
          { type: '+', payload: { x: 1, y: 2 } },
          handlers,
          (d) => d['type']
        ),
        3
      )
    ).toBeTruthy();
    expect(
      deepEqual(
        match(
          { type: '-', payload: { x: 1, y: 2 } },
          handlers,
          (d) => d['type']
        ),
        -1
      )
    ).toBeTruthy();
    expect(
      deepEqual(
        match(
          { type: '*', payload: { x: 1, y: 2 } },
          handlers,
          (d) => d['type']
        ),
        2
      )
    ).toBeTruthy();
    expect(
      deepEqual(
        match(
          { type: '/', payload: { x: 1, y: 2 } },
          handlers,
          (d) => d['type']
        ),
        0.5
      )
    ).toBeTruthy();
    expect(
      deepEqual(
        match(
          { type: '/', payload: { x: 1, y: 2 } },
          handlers,
          (d) => d['typed']
        ),
        undefined
      )
    ).toBeTruthy();
  });
});
