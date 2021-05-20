// import { sendMessage } from '../src';
// import { IMessage } from '../src/type';

describe('@zodash/nobot-feishu', () => {
  it('ok', () => {
    expect(true).toBeTruthy();
  });

  // const webhookUrl = '';

  // it('text message', async () => {
  //   const message: IMessage = {
  //     msg_type: 'text',
  //     content: {
  //       text: 'text content<at user_id=\"ou_88a56e7e8e9f680b682f6905cc09098e\">test</at>',
  //     },
  //   };

  //   expect(() => sendMessage(webhookUrl, message)).not.toThrowError();
  // });

  // it('image message', async () => {
  //   const message: IMessage = {
  //     msg_type: 'image',
  //     content: {
  //       image_key: '1a0c4cb9-c680-4371-924c-ddb5f2750c3d',
  //     },
  //   };

  //   expect(() => sendMessage(webhookUrl, message)).not.toThrowError();
  // });

  // it('post message (rich text)', async () => {
  //   const message: IMessage = {
  //     msg_type: 'post',
  //     content: {
  //       post: {
  //         zh_cn: {
  //           title: '我是一个标题',
  //           content:  [
  //             [
  //               {
  //                 tag: 'text',
  //                 un_escape: true,
  //                 text: '第一行&nbsp;:',
  //               },
  //               {
  //                 tag: 'a',
  //                 text: '超链接',
  //                 href: 'http://www.feishu.cn',
  //               },
  //               {
  //                 tag: 'at',
  //                 user_id: 'ou_18eac85d35a26f989317ad4f02e8bbbb',
  //               },
  //             ],
  //             [
  //               {
  //                 tag: 'text',
  //                 text: '第二行：',
  //               },
  //               {
  //                 tag: 'text',
  //                 text: '文本测试',
  //               },
  //             ],
  //             [
  //               {
  //                 tag: 'img',
  //                 image_key: 'd640eeea-4d2f-4cb3-88d8-c964fab53987',
  //                 width: 300,
  //                 height: 300,
  //               },
  //             ],
  //           ],
  //         },
  //       }
  //     },
  //   };

  //   expect(() => sendMessage(webhookUrl, message)).not.toThrowError();
  // });

  // it('share chat message (share group)', async () => {
  //   const message: IMessage = {
  //     msg_type: 'share_chat',
  //     content: {
  //       share_chat_id: 'oc_f5b1a7eb27ae2c7b6adc2a74faf339ff',
  //     },
  //   };

  //   expect(() => sendMessage(webhookUrl, message)).not.toThrowError();
  // });
});
