import { dataURL } from './dataURL';

/**
 * Generate QRCode jpeg from text
 *
 * @param text qrcode text
 */
export async function jpeg(text: string) {
  return dataURL(text, 'jpeg');
}
