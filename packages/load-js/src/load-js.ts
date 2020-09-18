import { loadScript } from '@zodash/load-script';

export async function loadJs(url: string) {
  return loadScript(url);
}

export default loadJs;
