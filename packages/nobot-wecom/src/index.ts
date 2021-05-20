import doreamon from '@zodash/doreamon';
import type { IMessage, IResponse } from './type';

export function createMessage(message: IMessage) {
  return message;
}

export async function request(url: string, body: any) {
  const response = await doreamon.request
    .post(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
    .json<IResponse>();

  // 31000
  if (response?.errcode !== 0) {
    throw new Error(`[${response?.errcode}] ${response?.errmsg}`);
  }
}

export async function sendMessage(url: string, message: IMessage) {
  const body = createMessage(message);
  return await request(url, body);
}

export default sendMessage;
