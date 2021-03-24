export interface ILoadedImage {
  url: string;
  image: HTMLImageElement;
}

function _loadImage(url: string) {
  return new Promise<ILoadedImage>((resolve, reject) => {
    const image = new Image();
    image.onload = () =>
      resolve({
        url,
        image,
      });
    image.onerror = reject;
    image.src = url;
  });
}

function _silent<I extends any[], T>(
  fn: (...args: I) => Promise<T>,
  ...args: I
): Promise<T | null> {
  try {
    return fn.call(null, ...args);
  } catch (error) {
    return Promise.resolve(null);
  }
}

export async function loadImage(url: string): Promise<ILoadedImage>;
export async function loadImage(urls: string[]): Promise<ILoadedImage[]>;
export async function loadImage(url: any) {
  if (Array.isArray(url)) {
    return await Promise.all(url.map((u) => _silent(_loadImage, u)));
  }

  return _silent(_loadImage, url);
}

export default loadImage;
