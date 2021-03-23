const SUFFIXS = ['', 'K', 'M', 'G', 'T'];

export function fileSize(bytes: number, dots: number = 2) {
  if (bytes <= 0) return '0';

  const suffixIndex = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(2, suffixIndex * 10);

  return `${+value.toFixed(dots)}${SUFFIXS[suffixIndex]}`;
}

export default fileSize;
