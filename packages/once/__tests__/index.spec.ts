import { once } from '../src/once';

describe('once', () => {
  it('run only once on Date', () => {
    const originFn = () => +new Date();

    const onceFn = once(originFn);
    expect(onceFn()).toEqual(onceFn());
    expect(onceFn()).toEqual(onceFn());
    expect(onceFn()).toEqual(onceFn());
    expect(onceFn()).toEqual(onceFn());
    expect(onceFn()).toEqual(onceFn());
    expect(onceFn()).toEqual(onceFn());
  });

  it('run only once on Number', () => {
    let count = 0;
    const originFn = () => ++count;

    const onceFn = once(originFn);
    expect(onceFn()).toEqual(onceFn());
    expect(onceFn()).toEqual(onceFn());
    expect(onceFn()).toEqual(onceFn());
    expect(onceFn()).toEqual(onceFn());
    expect(onceFn()).toEqual(onceFn());
    expect(onceFn()).toEqual(onceFn());
    expect(onceFn()).toEqual(1);
  });
});
