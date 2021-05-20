/**
 * Dingtalk Robot Docs:
 *  https://developers.dingtalk.com/document/app/custom-robot-access/title-zob-eyu-qse
 */

export type IMessage =
  | ITextMessage
  | IImageMessage
  | IMarkdownMessage
  | IRichMessage
  | IFile;

export type ITextMessage = {
  msgtype: 'text';
  text: {
    content: string;
    mentioned_list?: string[];
    mentioned_mobile_list?: string[];
  };
};

export type IImageMessage = {
  msgtype: 'image';
  image: {
    base64: string;
    md5: string;
  };
};

export type IMarkdownMessage = {
  msgtype: 'markdown';
  markdown: {
    content: string;
  };
};

export type IRichMessage = {
  msgtype: 'news';
  news: {
    articles: IArticle[];
  };
};

export type IFile = {
  msgtype: 'file';
  file: {
    media_id: string;
  };
};

export type IResponse = {
  errcode: number;
  errmsg: string;
};

//
export type IArticle = {
  title: string;
  description?: string;
  url: string;
  picurl?: string;
};
