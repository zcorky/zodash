export function isBlob(data: any) {
  return Object.prototype.toString.call(data) === '[object Blob]';
}

export async function saveAs(blob: Blob, filename?: string): Promise<void>;
export async function saveAs(text: string, filename?: string): Promise<void>;
export async function saveAs(blobOrText: any, filename = `${Date.now()}`) {
  const blob: Blob = isBlob(blobOrText)
    ? blobOrText
    : new Blob([blobOrText], { type: 'text/html' });

  const dataUrl = window.URL.createObjectURL(blob);

  const $link = document.createElement('a');
  $link.style.display = 'none';
  $link.href = dataUrl;
  $link.download = filename;

  document.body.appendChild($link);

  if ($link) {
    $link.click();
  } else {
    $link.target = '_blank';
    $link.dispatchEvent(
      new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      })
    );
  }

  window.URL.revokeObjectURL(dataUrl);
  document.body.removeChild($link);
}

export default saveAs;
