import { createMessage } from '../src';
import { IMessage } from '../src/type';

describe('@zodash/nobot-feishu', () => {
  it('text message', () => {
    const message: IMessage = {
      msg_type: 'text',
      content: {
        text:
          'text content<at user_id="ou_88a56e7e8e9f680b682f6905cc09098e">test</at>',
      },
    };

    expect(createMessage(message)).toEqual(message);
  });

  it('image message', () => {
    const message: IMessage = {
      msg_type: 'image',
      content: {
        image_key: '1a0c4cb9-c680-4371-924c-ddb5f2750c3d',
      },
    };

    expect(createMessage(message)).toEqual(message);
  });

  it('post message (rich text)', () => {
    const message: IMessage = {
      msg_type: 'post',
      content: {
        post: {
          zh_cn: {
            title: '我是一个标题',
            content: [
              [
                {
                  tag: 'text',
                  un_escape: true,
                  text: '第一行&nbsp;:',
                },
              ],
            ],
          },
        },
      },
    };

    expect(createMessage(message)).toEqual(message);
  });

  it('share chat message (share group)', () => {
    const message: IMessage = {
      msg_type: 'share_chat',
      content: {
        share_chat_id: 'oc_f5b1a7eb27ae2c7b6adc2a74faf339ff',
      },
    };

    expect(createMessage(message)).toEqual(message);
  });
});
