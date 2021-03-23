import Cache from '@zodash/cache';
import * as qrcode from 'qrcode';

const cache = new Cache(100);

export type DataUrl = string;

/**
 * Generate QRCode DataURL from text
 *
 * @param text qrcode text
 */
export async function toDataURL(text: string): Promise<DataUrl> {
  if (cache.get(text)) {
    return cache.get(text);
  }

  qrcode.toCanvas(text);
  const dataUrl = await qrcode.toDataURL(text);
  cache.set(text, dataUrl);
  return dataUrl;
}

export default toDataURL;
