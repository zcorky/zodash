import gzip from '../src';
import jsgzip from '../src/browser';

describe('@zodash/gzip', () => {
  it('works', async () => {
    const text = '你好，Zero';

    expect(await gzip.decompress(await gzip.compress(text))).toEqual(text);
  });

  // it('browser', async () => {
  //   const text = '你好，Zero';

  //   expect(
  //     await jsgzip.decompress(
  //       await jsgzip.compress(text),
  //     ),
  //   ).toEqual(text);
  // });

  // it('server = browser', async () => {
  //   const text = '你好，Zero';

  //   expect(
  //     await jsgzip.compress(text),
  //   ).toEqual(
  //     await gzip.compress(text),
  //   );
  // });
});
