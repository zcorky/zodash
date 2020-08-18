export async function url2Image(url: string): Promise<HTMLImageElement>  {
  return new Promise(resolve => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.src = url;
  });
}
