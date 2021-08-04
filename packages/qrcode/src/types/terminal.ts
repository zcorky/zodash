import * as qrcodeTerminal from 'qrcode-terminal';

/**
 * Show QRCode in Terminal
 *
 * @param text qrcode text
 */
export async function terminal(text: string) {
  return await qrcodeTerminal.generate(text);
}
