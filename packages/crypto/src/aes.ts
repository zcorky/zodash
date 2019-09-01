import { createCipheriv, createDecipheriv } from 'crypto';

/**
 * aes encrypt method
 * 
 * @param algorithm aee algorithm
 * @param iv vector, needs to be 16bytes long only
 * @param text the string should be encrypted
 * @param key key, needs to be
 *          128bit  => 16bytes
 *          192bit  => 24bytes
 *          256bit  => 32bytes
 * 
 * @returns encypted text using base64
 */
export function encrypt(algorithm: string, key: string, iv: string, text: string) {
  const cipher = createCipheriv(algorithm, Buffer.from(key), iv);
  const encrypted = cipher.update(text, 'utf8', 'base64');
  return encrypted + cipher.final('base64');
}

export function decrypt(algorithm: string, key: string, iv: string, text: string) {
  const cipher = createDecipheriv(algorithm, key, iv);
  const decrypted = cipher.update(text, 'base64', 'utf8');
  return decrypted + cipher.final('utf8');
}

// export function createAes() {
  
// }