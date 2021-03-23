import { dataUrl2Blob } from './dataUrl';

export async function canvas2DataUrl(
  canvas: HTMLCanvasElement,
  quality = 0.8,
  type = 'image/jpeg',
) {
  return canvas.toDataURL(type, quality);
}

export async function canvas2Blob(
  canvas: HTMLCanvasElement,
  quality: number,
  type: string,
): Promise<Blob> {
  if (!canvas.toBlob) {
    const dataUrl = await canvas2DataUrl(canvas, quality, type);
    return dataUrl2Blob(dataUrl);
  }
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => resolve(blob!),
      type || 'image/jpeg',
      quality || 0.8,
    );
  });
}
