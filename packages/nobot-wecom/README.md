# `@zodash/nobot-wecom`

> 企业微信通知机器人

## Usage

```js
import sendMessage from '@zodash/nobot-wecom';

sendMessage(webhookUrl, {
  msgtype: 'text',
  content: {
    text: '广州今日天气：29度，大部分多云，降雨概率：60%',
    mentioned_list: ['zero', '@all'],
  },
});

// more example see __tests__/sendMessage
```
