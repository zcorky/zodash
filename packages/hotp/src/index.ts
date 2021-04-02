import {
  randomToken,
  timeCounter2ByteText,
  hmacSha1,
  truncat,
  base32Decode,
} from './utils';

export {
  randomToken,
};

/**
 * OTP Token based on Secret
 */
export type IOTPToken = string;

export interface IHOTP {
  /**
   * Get an OTP Token based HMAC-SHA-1
   * 
   * @param timeCounter timeCounter number
   * @param secret secret string 
   */
  generate(secret: string, timeCounter: number): Promise<IOTPToken>;

  /**
   * Verify OTP Token is valid to Secret
   * 
   * @param token one-time password
   * @param secret secret string
   * @param timeCounter time counter
   */
  verify(token: IOTPToken, secret: string, timeCounter: number): Promise<boolean>;

  /**
   * Get HOTP URI
   * 
   * @param secret secret string
   * @param account account
   * @param issuer issuer or organazation
   */
  getURI(secret: string, account: string, issuer: string): Promise<string>;
}

export interface IHOTPOptions {
  base32?: IBase32;
  hmac?(key: string, message: string): Promise<string>;
}

export interface IBase32 {
  encode(decoded: string): Promise<string>;
  decode(encoded: string): Promise<string>;
}

export interface IOTPOptions {
  /**
   * One-time password length, default: 6
   */
  length?: number;
}

const CONSTANTS = {
  OTP_LENGTH: 6,
};


export class HOTP implements IHOTP {
  static generateSecret(length?: number) {
    return randomToken(length);
  }
  
  constructor(private readonly options?: IHOTPOptions) {}

  public async generate(secret: string, timeCounter: number, options?: IOTPOptions): Promise<IOTPToken> {
    const otpLength = options?.length ?? CONSTANTS.OTP_LENGTH;
    const _base32Decode = this.options?.base32?.decode ?? base32Decode;
    const _hmacSha1 = this.options?.hmac ?? hmacSha1;

    const timeCounterBytes = timeCounter2ByteText(timeCounter);
    const decodedSecret = await _base32Decode(secret);
    const secretHashHex = await _hmacSha1(decodedSecret, timeCounterBytes);
    return truncat(secretHashHex, otpLength);
  }

  public async verify(token: IOTPToken, secret: string, timeCounter: number) {
    return token === await this.generate(secret, timeCounter);
  }

  public async getURI(secret: string, account: string, issuer: string) {
    return `otpauth://hotp/${account}?issuer=${issuer}&secret=${secret}`
  }
}

export default HOTP;
