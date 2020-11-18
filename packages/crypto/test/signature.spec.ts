import * as path from 'path';
import { signature } from '../src/signature';

describe('signature', () => {

  it('md5', async () => {
    expect(await signature('md5', 'zero')).toEqual('d02c4c4cde7ae76252540d116a40f23a');
    expect(await signature('md5', 'zero', 'base64')).toEqual('0CxMTN5652JSVA0RakDyOg==');
  });

  it('sha1', async () => {
    expect(await signature('sha1', 'zero')).toEqual('aa8c41330509455ee5679d04ed41535d280d9a89');
    expect(await signature('sha1', 'zero', 'base64')).toEqual('qoxBMwUJRV7lZ50E7UFTXSgNmok=');
  });

  it('sha256', async () => {
    expect(await signature('sha256', 'zero')).toEqual('f9194e73f9e9459e3450ea10a179cdf77aafa695beecd3b9344a98d111622243');
    expect(await signature('sha256', 'zero', 'base64')).toEqual('+RlOc/npRZ40UOoQoXnN93qvppW+7NO5NEqY0RFiIkM=');
  });

  it('sha384', async () => {
    expect(await signature('sha384', 'zero')).toEqual('461aa3a1266d4940687ef5b25dfc7a618779e04ce7613f1874b7ae89724da8ce0892b77baebcd58e9e0ea91728eb94a6');
    expect(await signature('sha384', 'zero', 'base64')).toEqual('RhqjoSZtSUBofvWyXfx6YYd54EznYT8YdLeuiXJNqM4Ikrd7rrzVjp4OqRco65Sm');
  });

  it('sha512', async () => {
    expect(await signature('sha512', 'zero')).toEqual('2dc48a941c39b33a018574c517260c7887c7ba528c4ad68d7b792c4b2037a0ceb0f8d8c166d4a9f2d0b92ec0246df0a2f936a9f6e9da2e03a37cc9600abc3c7b');
    expect(await signature('sha512', 'zero', 'base64')).toEqual('LcSKlBw5szoBhXTFFyYMeIfHulKMStaNe3ksSyA3oM6w+NjBZtSp8tC5LsAkbfCi+Tap9unaLgOjfMlgCrw8ew==');
  });

  it('WeChat JS-SDK Signature(sha1)', async () => {
    expect(await signature('sha1', 'jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VMCPGGVi4C3VM0P37wVUCFvkVAy_90u5h9nbSlYy3-Sl-HhTdfl2fzFy1AOcHKP7qg&noncestr=Wm3WZYTPz0wzccnW&timestamp=1414587457&url=http://mp.weixin.qq.com?params=value')).toEqual('0f9de62fce790f9a083d5c99e95740ceb90c27ed');
  });
});