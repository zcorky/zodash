import * as types from './types';

export { types };

/**
 * Generate QRCode from text
 *
 * @param text qrcode text
 * @param type 'png' | 'svg' | 'jpeg' | 'webp'
 * @returns
 */
export async function generate(
  text: string,
  type: 'png' | 'svg' | 'jpeg' | 'webp' = 'png',
) {
  switch (type) {
    case 'svg':
      return types.svg(text);
    default:
      return types.dataURL(text, type);
  }
}

export default generate;
