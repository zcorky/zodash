import Cache from '@zodash/cache';
import * as qrcode from 'qrcode';

const cache = new Cache(100);

export type DataUrl = string;

/**
 * Generate QRCode DataURL from text
 *
 * @param text qrcode text
 */
export async function dataURL(
  text: string,
  type: 'png' | 'jpeg' | 'webp' = 'png',
): Promise<DataUrl> {
  if (cache.get(text)) {
    return cache.get(text);
  }

  qrcode.toCanvas(text);
  const mimeType = `image/${type}` as any;
  const dataUrl = await qrcode.toDataURL(text, { type: mimeType });

  cache.set(text, dataUrl);
  return dataUrl;
}
