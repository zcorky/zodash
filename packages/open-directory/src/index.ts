import { openFile } from '@zodash/open-file';

export function openDirectory() {
  return openFile({ isDirectory: true });
}

export default openDirectory;
