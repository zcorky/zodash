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

  if ('code' in response && response?.code !== 0) {
    throw new Error(`[${response?.code}] ${response?.msg}`);
  }

  if ('StatusCode' in response && response?.StatusCode !== 0) {
    throw new Error(`[${response?.StatusCode}] ${response?.StatusMessage}`);
  }
}

export async function sendMessage(url: string, message: IMessage) {
  const body = createMessage(message);
  return await request(url, body);
}

export default sendMessage;
