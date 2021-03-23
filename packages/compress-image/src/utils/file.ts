export async function file2DataUrl(
  file: File | Blob,
): Promise<FileReader['result']> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.readAsDataURL(file);
  });
}

export async function file2Image(file: File | Blob): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const image = new Image();
    const URL = window.webkitURL || window.URL;

    const url = URL.createObjectURL(file);

    image.onload = () => {
      resolve(image);
      URL.revokeObjectURL(url);
    };

    image.src = url;
  });
}
