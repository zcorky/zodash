# `@zodash/nobot-feishu`

> 飞书群通知机器人

## Usage

```js
import sendMessage from '@zodash/nobot-feishu';

sendMessage(webhookUrl, {
  msg_type: 'text',
  content: {
    text: 'text message',
  },
});

// more example see __tests__/sendMessage
```
