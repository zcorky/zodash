import * as nodemailer from 'nodemailer';

export interface IOptions {
  /**
   * SMTP Host
   */
  host: string;

  /**
   * SMTP Port
   */
  port: number;

  /**
   * SMTP User
   */
  auth: IAuth;
}

export interface IAuth {
  /**
   * SMTP username
   */
  user: string;

  /**
   * SMTP password
   */
  pass: string;
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

export class Mail {
  /**
   * Create a mail client
   * 
   * @param options mail config
   */
  static create(options: IOptions) {
    return new Mail(options);
  }

  /**
   * Alias of create
   * 
   * @param options mail config
   */
  static createClient(options: IOptions) {
    return this.create(options);
  }

  private transporter = nodemailer.createTransport({
    ...this.options,
    secure: true,
  });

  constructor(private readonly options: IOptions) {}

  /**
   * send mail method
   * 
   * @param mail content
   */
  public async send({ to, subject, content }: ISendData) {
    const { options } = this;
    const _data = {
      from: `${options.auth.user}<${options.auth.user}>`,
      to,
      subject,
      html: content,
    };

    return await this.transporter.sendMail(_data);
  }
}

export default Mail;
