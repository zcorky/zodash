import { sendMessage } from '../src';
import { IMessage } from '../src/type';

describe('@zodash/nobot-slack', () => {
  it('ok', () => {
    expect(true).toBeTruthy();
  });

  // const webhookUrl = 'https://hooks.slack.com/services/xxx';

  // it('text message', async () => {
  //   const message: IMessage = {
  //     msgtype: 'text',
  //     text: {
  //       "content": "广州今日天气：29度，大部分多云，降雨概率：60%",
  //     },
  //   };

  //   await expect(sendMessage(webhookUrl, message)).resolves.toEqual(void 0);
  // });

  // it('image message', async () => {
  //   const message: IMessage = {
  //     msgtype: 'image',
  //     image: {
  //       url: 'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0202%2F326d28e4j00qnvbqw0023c000hs00m7c.jpg&thumbnail=650x2147483647&quality=80&type=jpg',
  //     },
  //   };

  //   await expect(sendMessage(webhookUrl, message)).resolves.toEqual(void 0);
  // });

  // it('markdown message', async () => {
  //   const message: IMessage = {
  //     msgtype: 'markdown',
  //     markdown: {
  //       content: `This is a mrkdwn section block :ghost: *this is bold*, and ~this is crossed out~, and <https://google.com|this is a link>`
  //     },
  //   };

  //   await expect(sendMessage(webhookUrl, message)).resolves.toEqual(void 0);
  // });
});
