import * as fs from 'fs';
import * as path from 'path';
import NodeRSA from 'node-rsa';

import { encrypt, decrypt } from '../src/rsa';

describe('rsa', () => {
  const publicKey = fs.readFileSync(path.join(__dirname, './fixtures/public.pem'), 'utf8');
  const privateKey = fs.readFileSync(path.join(__dirname, './fixtures/private.pem'), 'utf8');

  it('encrypt && decrypt works', () => {
    expect(decrypt(privateKey, encrypt(publicKey, 'zero'))).toEqual('zero');
  });

  it('encrypt can be node-rsa.decrypt', () => {
    expect(
      new NodeRSA(privateKey).decrypt(encrypt(publicKey, 'zero'), 'utf8')
    ).toEqual('zero');
  });

  it('node-rsa.encrypt can be decrypt', () => {
    expect(
      decrypt(privateKey, new NodeRSA(publicKey).encrypt('zero', 'base64')),
    ).toEqual('zero');
  });
});