/**
 * Referer: https://stackoverflow.com/questions/8750780/encrypting-data-with-public-key-in-node-js
 *
 * How to create private + public key:
 *  private key: openssl genrsa -out private.pem 1024
 *  public key: openssl rsa -in private.pem -pubout -out public.pem
 *
 * Referrer: https://stackoverflow.com/questions/5244129/use-rsa-private-key-to-generate-public-key
 */
import { publicEncrypt, privateDecrypt } from 'crypto';

export function encrypt(publicKey: string, text: string) {
  return publicEncrypt(publicKey, Buffer.from(text)).toString('base64');
}

export function decrypt(privateKey: string, text: string) {
  return privateDecrypt(privateKey, Buffer.from(text, 'base64')).toString(
    'utf8'
  );
}

export default {
  encrypt,
  decrypt,
};
