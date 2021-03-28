import TOTP, { ITOTPOptions, IGetOptions, IVerifyOptions } from '@zodash/totp';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface I2faGetOptions extends IGetOptions, ITOTPOptions {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface I2faVerifyOptions extends IVerifyOptions, ITOTPOptions {}

/**
* Get a OTP based HMAC-SHA-1
* 
* @param token token string
* @param options optional options 
*/
export async function get(token: string, options?: I2faGetOptions): Promise<string> {
  const totp = new TOTP(options);

  return totp.get(token, options);
}

/**
 * Verify OTP is valid to Token
 * 
 * @param otp one-time password
 * @param token token string
 * @param options optional options 
 */
export async function verify(otp: string, token: string, options?: I2faVerifyOptions): Promise<boolean> {
  const totp = new TOTP(options);

  return totp.verify(otp, token, options);
}

/**
 * Get TOTP URI
 * 
 * @param token token string
 * @param account account
 * @param issuer issuer or organazation
 */
export async function getURI(token: string, account: string, issuer: string): Promise<string> {
  const totp = new TOTP();

  return totp.getURI(token, account, issuer);
}

/**
 * Get TTL
 * 
 * @param timeStep number, optional
 * @param startedTime milliseconds, optional
 */
export async function getTTL(timeStep?: number, startedTime?: number): Promise<number> {
  const totp = new TOTP();

  return totp.getTTL(timeStep, startedTime);
}
