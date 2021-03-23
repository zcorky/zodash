import Cache from '@zodash/cache';
import * as qrcode from 'qrcode';
import * as qrcodeTerminal from 'qrcode-terminal';

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

/**
 * Show QRCode in Terminal
 *
 * @param text qrcode text
 */
export async function toTerminal(text: string) {
  return await qrcodeTerminal.generate(text);
}

export default toDataURL;
