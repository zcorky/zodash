# `@zodash/nobot-slack`

> Slack 通知机器人

## Usage

```js
import sendMessage from '@zodash/nobot-slack';

sendMessage(webhookUrl, {
  msgtype: 'text',
  text: {
    content: '广州今日天气：29度，大部分多云，降雨概率：60%',
  },
});

// more example see __tests__/sendMessage
```
