import tracking from '../src';

describe('@zodash/tracking', () => {
  it('works', async () => {
    let count = 0;

    tracking.registryTrackingMonitor('error', (error) => {
      count += 1;
      console.log('receive error:', error);
    });

    tracking.registryTrackingMonitor({
      error: (error) => {
        count += 1;
        console.log('receive error:', error);
      },
    });

    tracking.track('error', new Error('an tracked error'));

    expect(count).toEqual(2);
  });
});
