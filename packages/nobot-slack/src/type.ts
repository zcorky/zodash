/**
 * Slack Robot Docs:
 *  https://slack.com/intl/zh-cn/help/articles/115005265703-%E4%B8%BA%E4%BD%A0%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8C%BA%E5%88%9B%E5%BB%BA%E6%9C%BA%E5%99%A8%E4%BA%BA
 *  https://api.slack.com/apps/new
 *  https://api.slack.com/reference/surfaces/formatting
 *  https://api.slack.com/block-kit
 *  https://api.slack.com/reference/block-kit/blocks
 *  https://api.slack.com/block-kit/building
 *  https://api.slack.com/tools/block-kit-builder
 */

export type IMessage = ITextMessage | IImageMessage | IMarkdownMessage;

export type ITextMessage = {
  msgtype: 'text';
  text: {
    content: string;
  };
};

export type IImageMessage = {
  msgtype: 'image';
  image: {
    url: string;
  };
};

export type IMarkdownMessage = {
  msgtype: 'markdown';
  markdown: {
    content: string;
  };
};
