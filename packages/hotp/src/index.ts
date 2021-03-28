import {
  randomToken,
  timeCounter2ByteText,
  hmac,
  truncat,
} from './utils';

export {
  randomToken,
};

export interface IHOTP {
  /**
   * Get a OTP based HMAC-SHA-1
   * 
   * @param timeCounter timeCounter number
   * @param token token string 
   */
  get(token: string, timeCounter: number): Promise<string>;

  /**
   * Verify OTP is valid to Token
   * 
   * @param otp one-time password
   * @param token token string
   * @param timeCounter time counter
   */
  verify(otp: string, token: string, timeCounter: number): Promise<boolean>;

  /**
   * Get HOTP URI
   * 
   * @param token token string
   * @param account account
   * @param issuer issuer or organazation
   */
  getURI(token: string, account: string, issuer: string): Promise<string>;
}

export interface IOTPOptions {
  /**
   * One-time password length, default: 6
   */
  length?: number;
}

export class HOTP implements IHOTP {
  public async get(token: string, timeCounter: number, options?: IOTPOptions): Promise<string> {
    const otpLength = options?.length ?? 6;
    const timeCounterBytes = timeCounter2ByteText(timeCounter);
    const hmacHash = hmac(token, timeCounterBytes);
    return truncat(hmacHash, otpLength);
  }

  public async verify(otp: string, token: string, timeCounter: number) {
    return otp === await this.get(token, timeCounter);
  }

  public async getURI(token: string, account: string, issuer: string) {
    return `otpauth://hotp/${account}?issuer=${issuer}&secret=${token}`
  }
}

export default HOTP;
