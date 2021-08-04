import osUsage from '../src';

describe('@zodash/os-usage', () => {
  it('works', async () => {
    const usage = await osUsage();
    console.log('usage: ', usage);

    expect(true).toBeTruthy();
  });
});
