import HOTP, { IHOTPOptions } from '@zodash/hotp';

export interface ITOTP {
   /**
   * Get a OTP based HMAC-SHA-1
   * 
   * @param secret secret string
   * @param options optional options 
   */
  generate(secret: string, options?: IGetOptions): Promise<string>;

  /**
   * Verify OTP is valid to Secret
   * 
   * @param otp one-time password
   * @param secret secret string
   * @param options optional options 
   */
  verify(otp: string, secret: string, options?: IVerifyOptions): Promise<boolean>;
  
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


const CONSTANTS = {
  TIME_STEP: 30,
  STARTED_AT: 0,
};

export class TOTP implements ITOTP {
  private hotp = new HOTP(this.options);

  constructor(private readonly options?: ITOTPOptions) {}

  public async generate(secret: string, options?: IGetOptions): Promise<string> {
    const timeStep = options?.timeStep ?? CONSTANTS.TIME_STEP;
    const startedAt = options?.startedAt ?? CONSTANTS.STARTED_AT;
    const length = options?.length;

    const timeCounter = getTimeCounter(timeStep, startedAt);
    return this.hotp.generate(secret, timeCounter, { length });
  }

  public async verify(otp: string, secret: string, options?: IVerifyOptions): Promise<boolean> {
    return otp === await this.generate(secret, options);
  }

  public async getURI(secret: string, account: string, issuer: string): Promise<string> {
    return `otpauth://totp/${account}?issuer=${issuer}&secret=${secret}`;
  }

  public async getTTL(timeStep = 30, startedAt = 0): Promise<number> {
    return getTTL(timeStep, startedAt);
  }
}

function getTimeCounter(timeStep: number, startedAt: number, nowSeconds = Date.now()) {
  return Math.floor((nowSeconds / 1000 - startedAt) / timeStep);
}

function getTTL(timeStep = 30, startedAt = 0) {
  const now = Date.now();
  return timeStep - Math.floor(now / 1000 - startedAt) % timeStep;
}

export default TOTP;
