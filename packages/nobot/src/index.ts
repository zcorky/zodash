import sendMessageToFeishu from '@zodash/nobot-feishu';
import sendMessageToDingtalk from '@zodash/nobot-dingtalk';
import sendMessageToWecom from '@zodash/nobot-wecom';
import sendMessageToSlack from '@zodash/nobot-slack';

import type { IProvider, IMessage } from './type';

export async function sendMessage(
  provider: IProvider,
  webhookURL: string,
  message: IMessage,
) {
  switch (provider) {
    case 'feishu':
      return sendMessageToFeishu(webhookURL, {
        msg_type: 'post',
        content: {
          post: {
            zh_cn: {
              title: message.title,
              content: [[{ tag: 'text', text: message.content }]],
            },
          },
        },
      });
    case 'dingtalk':
      return sendMessageToDingtalk(webhookURL, {
        msgtype: 'markdown',
        markdown: {
          title: message.title,
          text: [`**${message.title}**`, message.content].join('\n'),
        },
      });
    case 'wecom':
      return sendMessageToWecom(webhookURL, {
        msgtype: 'markdown',
        markdown: {
          content: `**${message.title}**\n> ${message.content}`,
        },
      });
    case 'slack':
      return sendMessageToSlack(webhookURL, {
        msgtype: 'markdown',
        markdown: {
          content: `**${message.title}**\n> ${message.content}`,
        },
      });
    default:
      throw new Error(`Unsupport provider: ${provider}`);
  }
}

export default sendMessage;
