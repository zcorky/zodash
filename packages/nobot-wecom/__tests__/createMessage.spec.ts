import { createMessage } from '../src';
import { IMessage } from '../src/type';

describe('@zodash/nobot-wecom', () => {
  it('text message', () => {
    const message: IMessage = {
      msgtype: 'text',
      text: {
        content: '广州今日天气：29度，大部分多云，降雨概率：60%',
        mentioned_list: ['wangqing', '@all'],
        mentioned_mobile_list: ['13800001111', '@all'],
      },
    };

    expect(createMessage(message)).toEqual(message);
  });

  it('image message', () => {
    const message: IMessage = {
      msgtype: 'image',
      image: {
        base64: 'DATA',
        md5: 'MD5',
      },
    };

    expect(createMessage(message)).toEqual(message);
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

    expect(createMessage(message)).toEqual(message);
  });

  it('rich message', () => {
    const message: IMessage = {
      msgtype: 'news',
      news: {
        articles: [
          {
            title: '中秋节礼品领取',
            description: '今年中秋节公司有豪礼相送',
            url: 'www.qq.com',
            picurl:
              'http://res.mail.qq.com/node/ww/wwopenmng/images/independent/doc/test_pic_msg1.png',
          },
        ],
      },
    };

    expect(createMessage(message)).toEqual(message);
  });

  it('file message', () => {
    const message: IMessage = {
      msgtype: 'file',
      file: {
        media_id: '3a8asd892asd8asd',
      },
    };

    expect(createMessage(message)).toEqual(message);
  });
});
