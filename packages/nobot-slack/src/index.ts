import doreamon from '@zodash/doreamon';
import type { IMessage } from './type';

export function createMessage(message: IMessage) {
  switch (message.msgtype) {
    case 'text':
      return {
        blocks: [
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: message.text.content,
            },
          },
        ],
      };
    case 'image':
      return {
        blocks: [
          {
            type: 'image',
            image_url: message.image.url,
            alt_text: '-', // @TODO
          },
        ],
      };
    case 'markdown':
      return {
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: message.markdown.content,
            },
          },
        ],
      };
    default:
      throw new Error(`unknown message type(${(message as any)?.type})`);
  }
}

export async function request(url: string, body: any) {
  try {
    // @TODO when status throw, cannot get text
    await doreamon.request
      .post(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })
      .text();
  } catch (error) {
    const response = error.response;
    const errmsg = (await response?.text()) ?? response.statusText;

    throw new Error(`[${response?.status}] ${errmsg}`);
  }
}

export async function sendMessage(url: string, message: IMessage) {
  const body = createMessage(message);
  return await request(url, body);
}

export default sendMessage;
