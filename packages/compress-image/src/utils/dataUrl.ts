export async function dataUrl2Image(
  dataUrl: string,
): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.src = dataUrl;
  });
}

export async function dataUrl2Blob(dataUrl: string, type?: string) {
  const data = dataUrl.split(',')[1];
  const mimePattern = /^data:(.*?)(;base64)?,/;
  const mime = dataUrl.match(mimePattern)![1];
  const binStr = atob(data);
  const len = binStr.length;
  const arr = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i);
  }

  return new Blob([arr], { type: type || mime });
}
