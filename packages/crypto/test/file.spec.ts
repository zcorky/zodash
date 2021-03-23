import * as path from 'path';
import * as file from '../src/file';

describe('file signature', () => {
  it('file md5', async () => {
    expect(
      await file.md5(path.resolve(__dirname, './fixtures/public.pem'))
    ).toEqual('AfPT9rXID3Rf9kFQCp0qHw==');
  });

  it('file sha1', async () => {
    expect(
      await file.sha1(path.resolve(__dirname, './fixtures/public.pem'))
    ).toEqual('QBL1ObgH8YpPjsv3Lkc+XuJzAr4=');
  });

  it('file sha256', async () => {
    expect(
      await file.sha256(path.resolve(__dirname, './fixtures/public.pem'))
    ).toEqual('0NzcoVphCcrrTzZV/WEjHN/Rvp85Dpr/oJck/lk1/+g=');
  });

  it('file sha384', async () => {
    expect(
      await file.sha384(path.resolve(__dirname, './fixtures/public.pem'))
    ).toEqual(
      'iCWZS0BQQBw6GUUVLVSMLtLMxMlMSTUZMAKTuHET0+fVtYGG+hwwgGXJOChBWCSq'
    );
  });

  it('file sha512', async () => {
    expect(
      await file.sha512(path.resolve(__dirname, './fixtures/public.pem'))
    ).toEqual(
      'XcLpWsLp6nvc/2cYb7N+FNXBHcuRszMJ6Bwv82kFwEr176jIrunIXnUguLoAl4PPgcO+97J0OpLYu9r4KJ+6iQ=='
    );
  });
});
