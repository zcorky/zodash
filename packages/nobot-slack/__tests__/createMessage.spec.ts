import { createMessage } from '../src';
import { IMessage } from '../src/type';

describe('@zodash/nobot-slack', () => {
  it('text message', () => {
    const message: IMessage = {
      msgtype: 'text',
      text: {
        content: '广州今日天气：29度，大部分多云，降雨概率：60%',
      },
    };

    expect(createMessage(message)).toEqual({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'plain_text',
            text: message.text.content,
          },
        },
      ],
    });
  });

  it('image message', () => {
    const message: IMessage = {
      msgtype: 'image',
      image: {
        url: 'https://github.com',
      },
    };

    expect(createMessage(message)).toEqual({
      blocks: [
        {
          type: 'image',
          image_url: message.image.url,
          alt_text: '-',
        },
      ],
    });
  });

  it('markdown message', () => {
    const message: IMessage = {
      msgtype: 'markdown',
      markdown: {
        content: `实时新增用户反馈<font color=\"warning\">132例</font>，请相关同事注意。\n
         >类型:<font color=\"comment\">用户反馈</font>
         >普通用户反馈:<font color=\"comment\">117例</font>
         >VIP用户反馈:<font color=\"comment\">15例</font>`,
      },
    };

    expect(createMessage(message)).toEqual({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: message.markdown.content,
          },
        },
      ],
    });
  });
});
