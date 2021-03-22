import runGenerator, { toPromise } from '../src';

describe('@zodash/run-generator - throw', () => {
  it('error', async () => {
    const fn = () => {
      return runGenerator(function* () {
        throw new Error('message');
      });
    };

    await expect(fn).rejects.toThrow('message');
  });
});
