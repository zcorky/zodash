/**
 * Dingtalk Robot Docs:
 *  https://developers.dingtalk.com/document/app/custom-robot-access/title-zob-eyu-qse
 */

export type IMessage =
  | ITextMessage
  | ILinkMessage
  | IMarkdownMessage
  | IActionCard
  | IFeedCard;

export type ITextMessage = {
  msgtype: 'text';
  text: {
    content: string;
  };
  at?: IAt;
};

export type ILinkMessage = {
  msgtype: 'link';
  link: {
    title: string;
    text: string;
    messageUrl: string;
    picUrl?: string;
  };
};

export type IMarkdownMessage = {
  msgtype: 'markdown';
  markdown: {
    title: string;
    text: string;
  };
  at?: IAt;
};

export type IActionCard = {
  msgtype: 'actionCard';
  actionCard: {
    title: string;
    text: string;
    singleTitle: string;
    singleURL: string;
    btnOrientation?: '0' | '1';
  };
};

export type IFeedCard = {
  msgtype: 'feedCard';
  feedCard: {
    links: ILink[];
  };
};

export type IResponse<Data = any> = {
  errcode: number;
  errmsg: string;
};

//
export type ILink = {
  title: string;
  messageURL: string;
  picURL: string;
};

export type IAt = {
  isAtAll?: boolean;
  atMobiles?: string[];
  atUserIds?: string[];
};
