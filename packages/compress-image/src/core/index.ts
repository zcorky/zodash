import {
  IImage2CanvasOptions,
  //
  file2Image,
  image2Canvas,
  canvas2Blob,
  blob2File,
} from '../utils';

export interface ICompressOptions extends IImage2CanvasOptions {
  quality?: number;
  mimeType?: string;
}

export async function compress(
  imageFile,
  options: ICompressOptions = {} as ICompressOptions,
) {
  // not image file
  if (!/image\//.test(imageFile.type)) {
    return imageFile;
  }

  const quality = options.quality || 0.8;
  let mimeType = options.mimeType || imageFile.type;
  // compress png to jpeg
  if (mimeType === 'image/png') {
    mimeType = 'image/jpeg';
  }

  const image = await file2Image(imageFile);
  const canvas = await image2Canvas(image, options);
  const blob = await canvas2Blob(canvas, quality, mimeType);
  const file = await blob2File(blob, imageFile.name, {
    lastModified: imageFile.lastModified,
  });

  // compress size invalid
  if (imageFile.size <= file.size) {
    return imageFile;
  }

  return file;
}
