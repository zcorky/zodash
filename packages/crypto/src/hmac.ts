import { createHmac, } from 'crypto';

export type Algorithm = 'md5' | 'sha1' | 'sha224' | 'sha256' | 'sha384' | 'sha512' | 'sha3';

export type Encoding = 'base64' | 'hex';

/**
 * Hmac Enrypt Method
 * 
 * @param algorithm algorithm
 * @param text the text will be encrypt
 * @param key secret key
 * @param encoding output encoding, default: hex
 */
export function encrypt(algorithm: Algorithm, text: string, key: string, encoding: Encoding = 'hex') {
  return createHmac(algorithm, key).update(text).digest(encoding);;
}

// export function decrypt(algorithm: Algorithm, text: string, key: string, encoding: Encoding = 'base64') {
//   return createHmac(algorithm, key).update(text).digest(encoding);;
// }

/**
 * HmacMd5
 * 
 * @param text the text will be encrypt
 * @param secret secret
 * @param encoding output encoding, default: hex
 */
export function hmacMD5(text: string, secret: string, encoding?: Encoding) {
  return encrypt('md5', text, secret, encoding);
}

/**
 * HmacSHA1
 * 
 * @param text the text will be encrypt
 * @param secret secret
 * @param encoding output encoding, default: hex
 */
export function hmacSHA1(text: string, secret: string, encoding?: Encoding) {
  return encrypt('sha1', text, secret, encoding);
}

/**
 * HmacSHA224
 * 
 * @param text the text will be encrypt
 * @param secret secret
 * @param encoding output encoding, default: hex
 */
export function hmacSHA224(text: string, secret: string, encoding?: Encoding) {
  return encrypt('sha224', text, secret, encoding);
}

/**
 * HmacSHA256
 * 
 * @param text the text will be encrypt
 * @param secret secret
 * @param encoding output encoding, default: hex
 */
export function hmacSHA256(text: string, secret: string, encoding?: Encoding) {
  return encrypt('sha256', text, secret, encoding);
}

/**
 * HmacSHA384
 * 
 * @param text the text will be encrypt
 * @param secret secret
 * @param encoding output encoding, default: hex
 */
export function hmacSHA384(text: string, secret: string, encoding?: Encoding) {
  return encrypt('sha384', text, secret, encoding);
}

/**
 * HmacSHA512
 * 
 * @param text the text will be encrypt
 * @param secret secret
 * @param encoding output encoding, default: hex
 */
export function hmacSHA512(text: string, secret: string, encoding?: Encoding) {
  return encrypt('sha512', text, secret, encoding);
}

// /**
//  * HmacSHA3
//  * 
//  * @param text the text will be encrypt
//  * @param secret secret
//  * @param encoding output encoding, default: hex
//  */
// export function hmacSHA3(text: string, secret: string, encoding?: Encoding) {
//   return encrypt('sha3', text, secret, encoding);
// }