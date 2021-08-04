import { dataURL } from './dataURL';

/**
 * Generate QRCode webp from text
 *
 * @param text qrcode text
 */
export async function webp(text: string) {
  return dataURL(text, 'webp');
}
