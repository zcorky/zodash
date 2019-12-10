import * as path from 'path';
import { signature } from '../src/signature';

describe('file signature', () => {

  it('file md5', async () => {
    expect(await signature('md5', 'zero')).toEqual('0CxMTN5652JSVA0RakDyOg==');
  });

  it('file sha1', async () => {
    expect(await signature('sha1', 'zero')).toEqual('qoxBMwUJRV7lZ50E7UFTXSgNmok=');
  });

  it('file sha256', async () => {
    expect(await signature('sha256', 'zero')).toEqual('+RlOc/npRZ40UOoQoXnN93qvppW+7NO5NEqY0RFiIkM=');
  });

  it('file sha384', async () => {
    expect(await signature('sha384', 'zero')).toEqual('RhqjoSZtSUBofvWyXfx6YYd54EznYT8YdLeuiXJNqM4Ikrd7rrzVjp4OqRco65Sm');
  });

  it('file sha512', async () => {
    expect(await signature('sha512', 'zero')).toEqual('LcSKlBw5szoBhXTFFyYMeIfHulKMStaNe3ksSyA3oM6w+NjBZtSp8tC5LsAkbfCi+Tap9unaLgOjfMlgCrw8ew==');
  });
});