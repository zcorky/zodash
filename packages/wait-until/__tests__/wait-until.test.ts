import { waitUntil } from '../src/wait-until';

describe('@zodash/wait-until', () => {
  it('works', (done) => {
    const fns = {
      fn: () => null,
    };
    const spy = jest.spyOn(fns, 'fn');

    const cancel = waitUntil(fns.fn, 100);
    expect(spy).not.toBeCalled();
    setTimeout(() => {
      expect(spy).toBeCalled();
      done();
    }, 101);
  });

  it('canceled', (done) => {
    const fns = {
      fn: () => null,
    };
    const spy = jest.spyOn(fns, 'fn');

    const cancel = waitUntil(fns.fn, 100);
    expect(spy).not.toBeCalled();
    cancel();
    setTimeout(() => {
      expect(spy).not.toBeCalled();
      done();
    }, 101);
  });
});
