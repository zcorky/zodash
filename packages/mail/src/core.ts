import * as nodemailer from 'nodemailer';
import { IOptions, ISendData } from './type';

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
    // secure: true,
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
