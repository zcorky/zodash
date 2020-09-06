export interface IImage2CanvasOptions {
  width?: number;
  height?: number;
}

export async function image2Canvas(image: HTMLImageElement, options: IImage2CanvasOptions = {}) {
  const { naturalWidth, naturalHeight } = image;
  const aspectRatio =  naturalWidth / naturalHeight;

  let width = Math.min(Math.max(options.width || 0, 0) || naturalWidth, naturalWidth);
  let height = Math.min(Math.max(options.height || 0, 0) || naturalHeight, naturalHeight);

  if (height * aspectRatio > width) {
    height = width / aspectRatio;
  } else {
    width = height * aspectRatio;
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  
  // 覆盖默认填充颜色 (#000), 解决黑屏问题
  ctx!.fillStyle = 'transparent';

  ctx!.drawImage(image, 0, 0, canvas.width, canvas.height);
  canvas.toBlob
  return canvas;
}