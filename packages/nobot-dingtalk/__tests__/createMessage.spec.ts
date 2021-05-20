import { createMessage } from '../src';
import { IMessage } from '../src/type';

describe('@zodash/nobot-feishu', () => {
  it('text message', () => {
    const message: IMessage = {
      msgtype: 'text',
      text: {
        content: '我就是我, @XXX 是不一样的烟火',
      },
      at: {
        atMobiles: ['180xxxxxx'],
        atUserIds: ['user123'],
        isAtAll: false,
      },
    };

    expect(createMessage(message)).toEqual(message);
  });

  it('image message', () => {
    const message: IMessage = {
      msgtype: 'link',
      link: {
        text:
          '这个即将发布的新版本，创始人xx称它为红树林。而在此之前，每当面临重大升级，产品经理们都会取一个应景的代号，这一次，为什么是红树林',
        title: '时代的火车向前开',
        picUrl: '',
        messageUrl:
          'https://www.dingtalk.com/s?__biz=MzA4NjMwMTA2Ng==&mid=2650316842&idx=1&sn=60da3ea2b29f1dcc43a7c8e4a7c97a16&scene=2&srcid=09189AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=0&key=&ascene=2&uin=&devicetype=android-23&version=26031933&nettype=WIFI',
      },
    };

    expect(createMessage(message)).toEqual(message);
  });

  it('markdown message (rich text)', () => {
    const message: IMessage = {
      msgtype: 'markdown',
      markdown: {
        title: '杭州天气',
        text:
          '#### 杭州天气 @150XXXXXXXX \n > 9度，西北风1级，空气良89，相对温度73%\n > ![screenshot](https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png)\n > ###### 10点20分发布 [天气](https://www.dingtalk.com) \n',
      },
      at: {
        atMobiles: ['180xxxxxx'],
        atUserIds: ['user123'],
        isAtAll: false,
      },
    };

    expect(createMessage(message)).toEqual(message);
  });

  it('action card message', () => {
    const message: IMessage = {
      msgtype: 'actionCard',
      actionCard: {
        title:
          '乔布斯 20 年前想打造一间苹果咖啡厅，而它正是 Apple Store 的前身',
        text: `![screenshot](https://gw.alicdn.com/tfs/TB1ut3xxbsrBKNjSZFpXXcXhFXa-846-786.png) 
### 乔布斯 20 年前想打造的苹果咖啡厅 
Apple Store 的设计正从原来满满的科技感走向生活化，而其生活化的走向其实可以追溯到 20 年前苹果一个建立咖啡馆的计划`,
        singleTitle: '阅读全文',
        singleURL: 'https://www.dingtalk.com/',
        btnOrientation: '0',
      },
    };

    expect(createMessage(message)).toEqual(message);
  });

  it('feed card message', () => {
    const message: IMessage = {
      msgtype: 'feedCard',
      feedCard: {
        links: [
          {
            title: '时代的火车向前开1',
            messageURL: 'https://www.dingtalk.com/',
            picURL:
              'https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png',
          },
          {
            title: '时代的火车向前开2',
            messageURL: 'https://www.dingtalk.com/',
            picURL:
              'https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png',
          },
        ],
      },
    };

    expect(createMessage(message)).toEqual(message);
  });
});
