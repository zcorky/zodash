import { sendMessage } from '../src';

describe('@zodash/nobot-slack', () => {
  it('ok', () => {
    expect(true).toBeTruthy();
  });

  // const message: IMessage = {
  //   title: '天气情况',
  //   content: '广州今日天气：29度，大部分多云，降雨概率：60%',
  // };

  // it('feishu', async () => {
  //   const provider = 'feishu';
  //   const webhookUrl = `https://open.feishu.cn/open-apis/bot/v2/hook/${TOKEN}`;

  //   await expect(sendMessage(provider, webhookUrl, message)).resolves.toEqual(void 0);
  // });

  // it('dingtalk', async () => {
  //   const provider = 'dingtalk';
  //   const webhookUrl = `https://oapi.dingtalk.com/robot/send?access_token=${TOKEN}`;

  //   await expect(sendMessage(provider, webhookUrl, message)).resolves.toEqual(void 0);
  // });

  // it('wecom', async () => {
  //   const provider = 'wecom';
  //   const webhookUrl = `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${TOKEN}`;

  //   await expect(sendMessage(provider, webhookUrl, message)).resolves.toEqual(void 0);
  // });

  // it('slack', async () => {
  //   const provider = 'slack';
  //   const webhookUrl = `https://hooks.slack.com/services/${TOKEN}`;

  //   await expect(sendMessage(provider, webhookUrl, message)).resolves.toEqual(void 0);
  // });
});
