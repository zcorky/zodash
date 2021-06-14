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
export async function toDataURL(text: string, type: 'png' | 'jpeg' | 'webp' = 'png'): Promise<DataUrl> {
  if (cache.get(text)) {
    return cache.get(text);
  }

  qrcode.toCanvas(text);
  const mimeType = `image/${type}` as any;
  const dataUrl = await qrcode.toDataURL(text, { type: mimeType });
  
  cache.set(text, dataUrl);
  return dataUrl;
}

/**
 * Generate QRCode Png from text
 *
 * @param text qrcode text
 */
export async function toPng(text: string) {
  return toDataURL(text);
}

/**
 * Generate QRCode jpeg from text
 *
 * @param text qrcode text
 */
 export async function toJpeg(text: string) {
  return toDataURL(text, 'jpeg');
}

/**
 * Generate QRCode webp from text
 *
 * @param text qrcode text
 */
 export async function toWebp(text: string) {
  return toDataURL(text, 'webp');
}

/**
 * Generate QRCode Svg from text
 *
 * @param text qrcode text
 */
 export async function toSvg(text: string) {
  return qrcode.toString(text, { type: 'svg' });
}

/**
 * Show QRCode in Terminal
 *
 * @param text qrcode text
 */
export async function toTerminal(text: string) {
  return await qrcodeTerminal.generate(text);
}

/**
 * Generate QRCode from text
 * 
 * @param text qrcode text
 * @param type 'png' | 'svg' | 'jpeg' | 'webp'
 * @returns 
 */
export async function generate(text: string, type: 'png' | 'svg' | 'jpeg' | 'webp' = 'png') {
  switch (type) {
    case 'svg':
      return toSvg(text);
    default:
      return toDataURL(text, type);
  }
}

export default generate;
