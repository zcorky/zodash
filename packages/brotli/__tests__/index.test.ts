import brotli from '../src';
import jsbrotli from '../src/browser';

describe('@zodash/brotli', () => {
  it('works', async () => {
    const text = '你好，Zero';

    expect(await brotli.decompress(await brotli.compress(text))).toEqual(
      text,
    );
  });

  // it('browser', async () => {
  //   const text = '你好，Zero';

  //   expect(
  //     await jsbrotli.decompress(
  //       await jsbrotli.compress(text),
  //     ),
  //   ).toEqual(text);
  // });
});
