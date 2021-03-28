import HOTP, { IHOTPOptions } from '@zodash/hotp';

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
   * @param startedAt milliseconds, optional
   */
  getTTL(timeStep?: number, startedAt?: number): Promise<number>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ITOTPOptions extends IHOTPOptions {
  //
}

export interface IGetOptions {
  /**
   * Time step seconds, default: 30
   */
  timeStep?: number;

  /**
   * Started time milliseconds, default: 0
   */
  startedAt?: number;

  /**
   * One-time password length, default: 6
   */
  length?: number;
}

export type IVerifyOptions = IGetOptions;


const CONSTANTS = {
  TIME_STEP: 30,
  STARTED_AT: 0,
};

export class TOTP implements ITOTP {
  private hotp = new HOTP(this.options);

  constructor(private readonly options?: ITOTPOptions) {}

  public async get(token: string, options?: IGetOptions): Promise<string> {
    const timeStep = options?.timeStep ?? CONSTANTS.TIME_STEP;
    const startedAt = options?.startedAt ?? CONSTANTS.STARTED_AT;
    const length = options?.length;

    const timeCounter = Math.floor((Date.now() / 1000 - startedAt) / timeStep);
    return this.hotp.get(token, timeCounter, { length });
  }

  public async verify(otp: string, token: string, options?: IVerifyOptions): Promise<boolean> {
    return otp === await this.get(token, options);
  }

  public async getURI(token: string, account: string, issuer: string): Promise<string> {
    return `otpauth://totp/${account}?issuer=${issuer}&secret=${token}`;
  }

  public async getTTL(timeStep = 30, startedAt = 0): Promise<number> {
    const now = Math.floor(Date.now() / 1000);
    const timeCounter = Math.floor((now - startedAt) / timeStep);
    return timeStep - (now - (timeCounter * timeStep + startedAt));
  }
}

export default TOTP;
