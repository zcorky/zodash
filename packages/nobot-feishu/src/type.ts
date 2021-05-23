/**
 * Feishu Robot Docs: https://www.feishu.cn/hc/zh-CN/articles/360024984973#magicdomid-3_135
 */

export type IMessage =
  | ITextMessage
  | IImageMessage
  | IRichTextMessage
  | IShareMessage;

export type ITextMessage = {
  msg_type: 'text';
  content: {
    text: string;
  };
};

export type IImageMessage = {
  msg_type: 'image';
  content: {
    image_key: string;
  };
};

export type IRichTextMessage = {
  msg_type: 'post';
  content: {
    // post: Record<'zh_cn' | 'en_us' | 'ja_jp', IRichTextCard>,
    post: {
      [key in 'zh_cn' | 'en_us' | 'ja_jp']?: IRichTextCard;
    };
  };
};

export type IShareMessage = {
  msg_type: 'share_chat';
  content: {
    share_chat_id: string;
  };
};

export type IResponse<Data = any> =
  | {
      code: number;
      msg: string;
      data: Data;
    }
  | {
      // @TODO 2021.05.23 测试发现飞书偷偷升级了返回结果，类型不对了
      StatusCode: number;
      StatusMessage: string;
      Extra: Data;
    };

//
export type IRichTextCard = {
  title: string;
  content: IMessageBlock[][];
};

export type IMessageBlock =
  | {
      tag: 'text';
      un_escape?: boolean;
      text: string;
    }
  | {
      tag: 'a';
      text: string;
      href: string;
    }
  | {
      tag: 'at';
      user_id: string;
    }
  | {
      tag: 'img';
      image_key: string;
      width: number;
      height: number;
    };
