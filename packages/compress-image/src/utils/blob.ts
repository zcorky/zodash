import { file2DataUrl, file2Image } from './file';

export async function blob2DataUrl(blob: Blob) {
  return file2DataUrl(blob);
}

export async function blob2Image(blob: Blob) {
  return file2Image(blob);
}

export async function blob2File(
  blob: Blob,
  filename: string,
  options?: FilePropertyBag,
) {
  return new File([blob], filename, options);
}
