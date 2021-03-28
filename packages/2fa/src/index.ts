import TOTP, { IGetOptions, IVerifyOptions } from '@zodash/totp';

const totp = new TOTP();

/**
* Get a OTP based HMAC-SHA-1
* 
* @param token token string
* @param options optional options 
*/
export async function get(token: string, options?: IGetOptions): Promise<string> {
  return totp.get(token, options);
}

/**
 * Verify OTP is valid to Token
 * 
 * @param otp one-time password
 * @param token token string
 * @param options optional options 
 */
export async function verify(otp: string, token: string, options?: IVerifyOptions): Promise<boolean> {
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
  return totp.getURI(token, account, issuer);
}

/**
 * Get TTL
 * 
 * @param timeStep number, optional
 * @param startedTime milliseconds, optional
 */
export async function getTTL(timeStep?: number, startedTime?: number): Promise<number> {
  return totp.getTTL(timeStep, startedTime);
}
