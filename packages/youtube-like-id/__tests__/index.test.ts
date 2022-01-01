import * as yli from '../src';

describe('@zodash/youtube-like-id', () => {
  it('works', () => {
    const id_number = 9007199254740989;
    const id_string = 'fE2XnNGpF';

    expect(yli.encode(id_number)).toEqual(id_string);
    expect(yli.decode(id_string)).toEqual(id_number);
  });
});
