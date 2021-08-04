import { dataURL } from './dataURL';

/**
 * Generate QRCode Png from text
 *
 * @param text qrcode text
 */
export async function png(text: string) {
  return dataURL(text);
}
