import TOTP, { ITOTPOptions, IGetOptions, IVerifyOptions } from '@zodash/totp';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface I2faGetOptions extends IGetOptions, ITOTPOptions {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface I2faVerifyOptions extends IVerifyOptions, ITOTPOptions {}

/**
* Get a OTP Token based HMAC-SHA-1
* 
* @param secret secret string
* @param options optional options 
*/
export async function generate(secret: string, options?: I2faGetOptions): Promise<string> {
  const totp = new TOTP(options);

  return totp.generate(secret, options);
}

/**
 * Verify OTP Token is valid to Secret
 * 
 * @param token one-time password
 * @param secret secret string
 * @param options optional options 
 */
export async function verify(token: string, secret: string, options?: I2faVerifyOptions): Promise<boolean> {
  const totp = new TOTP(options);

  return totp.verify(token, secret, options);
}

/**
 * Get TOTP URI
 * 
 * @param secret secret string
 * @param account account
 * @param issuer issuer or organazation
 */
export async function getURI(secret: string, account: string, issuer: string): Promise<string> {
  const totp = new TOTP();

  return totp.getURI(secret, account, issuer);
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
