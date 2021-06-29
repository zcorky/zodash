import * as zlib from 'zlib';

/**
 * Compress utf8 string to base64 string
 *
 * @param text utf8 string
 * @returns base64 string
 */
export async function compress(text: string) {
  return new Promise<string>((resolve, reject) => {
    const buffer = Buffer.from(text);

    return zlib.gzip(buffer, { level: 3 }, (error, res) => {
      if (error) {
        return reject(error);
      }

      return resolve(res.toString('base64'));
    });
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
    const buffer = Buffer.from(text, 'base64');

    return zlib.gunzip(buffer, (error, res) => {
      if (error) {
        return reject(error);
      }

      return resolve(res.toString());
    });
  });
}

export default {
  compress,
  decompress,
};
