import HOTP from '@zodash/hotp';

export interface ITOTP {
   /**
   * Get a OTP based HMAC-SHA-1
   * 
   * @param token token string
   * @param options optional options 
   */
  get(token: string, options?: IGetOptions): Promise<string>;

  /**
   * Verify OTP is valid to Token
   * 
   * @param otp one-time password
   * @param token token string
   * @param options optional options 
   */
  verify(otp: string, token: string, options?: IVerifyOptions): Promise<boolean>;
  
  /**
   * Get TOTP URI
   * 
   * @param token token string
   * @param account account
   * @param issuer issuer or organazation
   */
  getURI(token: string, account: string, issuer: string): Promise<string>;
  
  /**
   * Get TTL
   * 
   * @param timeStep number, optional
   * @param startedTime milliseconds, optional
   */
  getTTL(timeStep?: number, startedTime?: number): Promise<number>;
}

export interface IGetOptions {
  /**
   * Time step seconds, default: 30
   */
  timeStep?: number;

  /**
   * Started time milliseconds, default: 0
   */
  startedTime?: number;

  /**
   * One-time password length, default: 6
   */
  length?: number;
}

export type IVerifyOptions = IGetOptions;

export class TOTP implements ITOTP {
  private hotp = new HOTP();

  public async get(token: string, options?: IGetOptions): Promise<string> {
    const timeStep = options?.timeStep ?? 30;
    const startedTime = options?.startedTime ?? 0;
    const length = options?.length ?? 0;

    const timeCounter = Math.floor((Date.now() / 1000 - startedTime) / timeStep);
    return this.hotp.get(token, timeCounter, { length });
  }

  public async verify(otp: string, token: string, options?: IVerifyOptions): Promise<boolean> {
    return otp === await this.get(token, options);
  }

  public async getURI(token: string, account: string, issuer: string): Promise<string> {
    return `otpauth://totp/${account}?issuer=${issuer}&secret=${token}`;
  }

  public async getTTL(timeStep = 30, startedTime = 0): Promise<number> {
    const now = Math.floor(Date.now() / 1000);
    const timeCounter = Math.floor((now - startedTime) / timeStep);
    return timeStep - (now - (timeCounter * timeStep + startedTime));
  }
}

export default TOTP;
