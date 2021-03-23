import * as path from 'path';
import * as perf from '../src/performance';
// import * as hash from '@zodash/crypto/lib/file';

describe('@zodash/performance', () => {
  it('time', async () => {
    expect(await perf.time(async () => {})).toBeGreaterThanOrEqual(0);

    // // md5 file
    // const demo = async () => {
    //   const md5 = await hash.md5(path.join(__dirname, '/fixtures/public.pem'));
    //   console.log('md5: ', md5);
    // }

    // const times = await perf.time(demo);
    // console.log('time: ', times);
    // expect(times).toBeGreaterThanOrEqual(0);
  });
});
