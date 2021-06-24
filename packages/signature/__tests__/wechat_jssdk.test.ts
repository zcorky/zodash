import { signature } from '../src/wechat/jssdk';

describe('@zodash/signature/wechat.jssdk', () => {
  it('works', async () => {
    expect(
      signature({
        url: 'http://mp.weixin.qq.com?params=value',
        jsapi_ticket:
          'sM4AOVdWfPE4DxkXGEs8VMCPGGVi4C3VM0P37wVUCFvkVAy_90u5h9nbSlYy3-Sl-HhTdfl2fzFy1AOcHKP7qg',
        noncestr: 'Wm3WZYTPz0wzccnW',
        timestamp: 1414587457,
      }),
    ).toEqual('0f9de62fce790f9a083d5c99e95740ceb90c27ed');
  });
});
