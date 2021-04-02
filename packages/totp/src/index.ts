import HOTP, { IHOTPOptions, IOTPToken } from '@zodash/hotp';
import { getTimeCounter, getTTL } from './utils';

export interface ITOTP {
   /**
   * Get an OTP Token based HMAC-SHA-1
   * 
   * @param secret secret string
   * @param options optional options 
   */
  generate(secret: string, options?: IGetOptions): Promise<IOTPToken>;

  /**
   * Verify OTP Token is valid to Secret
   * 
   * @param token one-time password
   * @param secret secret string
   * @param options optional options 
   */
  verify(token: IOTPToken, secret: string, options?: IVerifyOptions): Promise<boolean>;
  
  /**
   * Get TOTP URI
   * 
   * @param secret secret string
   * @param account account
   * @param issuer issuer or organazation
   */
  getURI(secret: string, account: string, issuer: string): Promise<string>;
  
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
   * Started time seconds, default: 0
   */
  startedAt?: number;

  /**
   * One-time password length, default: 6
   */
  length?: number;
}

export type IVerifyOptions = IGetOptions;

export class TOTP implements ITOTP {
  private hotp = new HOTP(this.options);

  constructor(private readonly options?: ITOTPOptions) {}

  public async generate(secret: string, options?: IGetOptions): Promise<IOTPToken> {
    const timeStep = options?.timeStep;
    const startedAt = options?.startedAt;
    const length = options?.length;

    const timeCounter = getTimeCounter(timeStep, startedAt);
    return this.hotp.generate(secret, timeCounter, { length });
  }

  public async verify(token: IOTPToken, secret: string, options?: IVerifyOptions): Promise<boolean> {
    return token === await this.generate(secret, options);
  }

  public async getURI(secret: string, account: string, issuer: string): Promise<string> {
    return `otpauth://totp/${account}?issuer=${issuer}&secret=${secret}`;
  }

  public async getTTL(timeStep?: number, startedAt?: number): Promise<number> {
    return getTTL(timeStep, startedAt);
  }
}

export default TOTP;
