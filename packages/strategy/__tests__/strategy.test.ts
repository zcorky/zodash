import { deepEqual } from '@zcorky/deep-equal';
import { strategy } from '../src/strategy';

describe('@zodash/strategy', () => {
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

    const doWithStrategy = strategy(handlers, (d) => d.method);

    expect(
      deepEqual(doWithStrategy({ method: '+', x: 1, y: 2 }), 3),
    ).toBeTruthy();
    expect(
      deepEqual(doWithStrategy({ method: '-', x: 1, y: 2 }), -1),
    ).toBeTruthy();
    expect(
      deepEqual(doWithStrategy({ method: '*', x: 1, y: 2 }), 2),
    ).toBeTruthy();
    expect(
      deepEqual(doWithStrategy({ method: '/', x: 1, y: 2 }), 0.5),
    ).toBeTruthy();
    expect(
      deepEqual(doWithStrategy({ method: '//' as any, x: 1, y: 2 }), undefined),
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

    const doWithS = strategy(handlers, (d) => d.type);

    expect(
      deepEqual(doWithS({ type: '+', payload: { x: 1, y: 2 } }), 3),
    ).toBeTruthy();
    expect(
      deepEqual(doWithS({ type: '-', payload: { x: 1, y: 2 } }), -1),
    ).toBeTruthy();
    expect(
      deepEqual(doWithS({ type: '*', payload: { x: 1, y: 2 } }), 2),
    ).toBeTruthy();
    expect(
      deepEqual(doWithS({ type: '/', payload: { x: 1, y: 2 } }), 0.5),
    ).toBeTruthy();
    expect(
      deepEqual(
        doWithS({ type: '//' as any, payload: { x: 1, y: 2 } }),
        undefined,
      ),
    ).toBeTruthy();
  });
});
