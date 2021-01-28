export interface IProvider {
  /**
   * SMTP Host
   */
  host: string;

  /**
   * SMTP Port
   */
  port: number;

  /**
   * defines if the connection should use SSL (if true) or not (if false)
   */
  secure: boolean;
}

export interface IProviderUser {
  /**
   * SMTP username
   */
  user: string;

  /**
   * SMTP password
   */
  pass: string;
}

export interface IOptions extends IProvider {
  /**
   * SMTP User
   */
  auth: IProviderUser;
}

export interface ISendData {
  /**
   * mail address that you want to send to
   */
  to: string;

  /**
   * mail subject or title
   */
  subject: string;

  /**
   * mail content, support text or html
   */
  content: IText | IHTML;
}

type IText = string;
type IHTML = string;