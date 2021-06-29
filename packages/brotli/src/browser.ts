import * as jsbrotli from 'brotli';

/**
 * Compress utf8 string to base64 string
 *
 * @param text utf8 string
 * @returns base64 string
 */
export async function compress(text: string) {
  return new Promise<string>((resolve, reject) => {
    try {
      const buffer = Buffer.from(text);
      const res = jsbrotli.compress(buffer);
      return resolve(Buffer.from(res).toString('base64'));
    } catch (error) {
      return reject(error);
    }
  });
}

/**
 * Decompress base64 string to utf8 string
 *
 * @param text base64 string
 * @returns utf8 string
 */
export async function decompress(text: string) {
  return new Promise<string>((resolve, reject) => {
    try {
      const buffer = Buffer.from(text, 'base64');
      const res = jsbrotli.decompress(buffer);
      return resolve(Buffer.from(res).toString());
    } catch (error) {
      return reject(error);
    }
  });
}

export default {
  compress,
  decompress,
};
