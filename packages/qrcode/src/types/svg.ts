import * as qrcode from 'qrcode';

/**
 * Generate QRCode Svg from text
 *
 * @param text qrcode text
 */
export async function svg(text: string) {
  return qrcode.toString(text, { type: 'svg' });
}
