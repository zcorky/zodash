import runGenerator, { toPromise } from '../src';

describe('@zodash/run-generator - promise', () => {
  it('number', async () => {
    const expected = 0;
    const value = await runGenerator(function* () {
      return toPromise(expected);
    });

    expect(value).toEqual(expected);
  });

  it('string', async () => {
    const expected = 'zero';
    const value = await runGenerator(function* () {
      return toPromise(expected);
    });

    expect(value).toEqual(expected);
  });

  it('boolean', async () => {
    const expected = false;
    const value = await runGenerator(function* () {
      return toPromise(expected);
    });

    expect(value).toEqual(expected);
  });

  it('undefined', async () => {
    const expected = undefined;
    const value = await runGenerator(function* () {
      return toPromise(expected);
    });

    expect(value).toEqual(expected);
  });
});
