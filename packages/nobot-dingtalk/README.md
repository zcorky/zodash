# `@zodash/nobot-dingtalk`

> 钉钉通知机器人

## Usage

```js
import sendMessage from '@zodash/nobot-dingtalk';

sendMessage(webhookUrl, {
  msgtype: 'text',
  text: {
    content: '我就是我, @XXX 是不一样的烟火',
  },
  at: {
    atMobiles: ['180xxxxxx'],
    atUserIds: ['user123'],
    isAtAll: false,
  },
});

// more example see __tests__/sendMessage
```
