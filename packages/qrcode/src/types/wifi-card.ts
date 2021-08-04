import Cache from '@zodash/cache';

const cache = new Cache(100);

import { dataURL } from './dataURL';

export interface WifiCardOptions {
  /**
   * Encryption Mode
   */
  encryptionMode: 'WAP' | 'WEP' | 'none';

  /**
   * SSID
   */
  ssid: string;

  /**
   * Password
   */
  password: string;
}

export async function wifiCard(options: WifiCardOptions) {
  const { encryptionMode, ssid, password } = options;
  const key = `${encryptionMode}:${ssid}:${password}`;
  if (cache.get(key)) {
    return cache.get(key);
  }

  const wifi = `WIFI:T:${encryptionMode};S:${ssid};P:${password};;`;
  const _dataUrl = await dataURL(wifi);
  cache.set(key, _dataUrl);
  return _dataUrl;
}
