import { each } from '@zodash/each';
import { map } from '@zodash/map';

import { mime } from '../src';
import { MAP_MIME_EXTS } from '../src/data';

describe('@zodash/mime', () => {
  // const data = [
  //   { ext: 'jpg', mime: 'image/jpeg' },
  //   { ext: 'bmp', mime: 'image/bmp' },
  //   { ext: 'mp4', mime: 'video/mp4' },
  //   { ext: 'md', mime: 'text/markdown' },
  //   { ext: 'yml', mime: 'text/yaml' },
  //   { ext: 'css', mime: 'text/css' },
  //   { ext: 'js', mime: 'application/javascript' },
  // ];

  const data = map(MAP_MIME_EXTS, item => ({
    ext: item[1][0],
    mime: item[0],
  }))

  it('ext => mime', () => {
    each(data, item => {
      expect(mime(item.ext)).toEqual(item.mime);
    });
  });

  it('mime => ext', () => {
    each(data, item => {
      expect(mime(item.mime)).toEqual(item.ext);
    });
  });

  it('unknown', () => {
    expect(mime('unknown')).toEqual(undefined);
    expect(mime('unknown/unknown')).toEqual(undefined);
  });
});
