import runGenerator, { toPromise } from '../src';

describe('@zodash/run-generator - throw', () => {
  it('error', async () => {
    const fn = () => runGenerator(function* () {
      const x: number = yield 2;
      const y: number = yield x + 4;
      const z: string = yield `${y}6`;
      const v = `${z}6`;
      return v;
    });

    expect(await fn()).toBe('666');
  });
});
