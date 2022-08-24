import * as lolex from 'lolex';
import debounce, { FnO } from '../src/debounce';

describe('debounce', () => {
  let clock;

  beforeEach(() => {
    clock = lolex.install({
      now: Date.now(),
    });
  });

  afterEach(() => {
    clock.uninstall();
  });

  it('should debounce with default timeout(250ms)', () => {
    const callback = jest.fn();

    const fn = debounce(callback);

    setTimeout(fn, 0);
    setTimeout(fn, 50);
    setTimeout(fn, 100);
    setTimeout(fn, 351);

    clock.tick(351);

    expect(callback.mock.calls.length).toEqual(1);
  });

  it('should debounce with fast timeout', () => {
    const callback = jest.fn();

    const fn = debounce(callback, 100);

    setTimeout(fn, 100);
    setTimeout(fn, 150);
    setTimeout(fn, 200);
    setTimeout(fn, 250);

    clock.tick(350);

    expect(callback.mock.calls.length).toEqual(1);
  });

  it('should debounce twice with fast timeout', () => {
    const callback = jest.fn();

    const fn = debounce(callback, 100);

    setTimeout(fn, 100);
    setTimeout(fn, 150);
    setTimeout(fn, 251);

    clock.tick(351);

    expect(callback.mock.calls.length).toEqual(2);
  });

  it('should not execute prior to timeout', () => {
    const callback = jest.fn();
    const fn = debounce(callback, 100);

    setTimeout(fn, 100);
    setTimeout(fn, 150);

    clock.tick(175);

    expect(callback.mock.calls.length).toEqual(0);
  });
});

describe('debounce immediate', () => {
  let clock;

  beforeEach(() => {
    clock = lolex.install({
      now: Date.now(),
    });
  });

  afterEach(() => {
    clock.uninstall();
  });

  it('should debounce with fast timeout', () => {
    const callback = jest.fn();

    const fn = debounce(callback, 100, true);

    setTimeout(fn, 100);
    setTimeout(fn, 150);
    setTimeout(fn, 200);
    setTimeout(fn, 250);

    clock.tick(350);

    expect(callback.mock.calls.length).toEqual(1);
  });

  it('should debounce twice with fast timeout', () => {
    const callback = jest.fn();

    const fn = debounce(callback, 100, true);

    setTimeout(fn, 100);
    setTimeout(fn, 150);
    setTimeout(fn, 251);

    clock.tick(351);

    expect(callback.mock.calls.length).toEqual(2);
  });

  it('should execute prior to timeout', () => {
    const callback = jest.fn();
    const fn = debounce(callback, 100, true);

    setTimeout(fn, 100);
    setTimeout(fn, 150);

    clock.tick(175);

    expect(callback.mock.calls.length).toEqual(1);
  });
});

describe('debounce, then cancel', () => {
  let clock;

  beforeEach(() => {
    clock = lolex.install({
      now: Date.now(),
    });
  });

  afterEach(() => {
    clock.uninstall();
  });

  it('cancel before timeout', () => {
    const callback = jest.fn();
    const fn = debounce(callback, 100);

    setTimeout(fn, 0);
    setTimeout(() => (fn as FnO<any, any>).cancel(), 50);

    clock.tick(150);

    expect(callback.mock.calls.length).toEqual(0);
  });

  it('cancel after timeout', () => {
    const callback = jest.fn();
    const fn = debounce(callback, 100);

    setTimeout(fn, 0);
    setTimeout(() => (fn as FnO<any, any>).cancel(), 110);

    clock.tick(150);

    expect(callback.mock.calls.length).toEqual(1);
  });
});
