export interface IOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: string;
}

export async function download(
  url: string,
  filename: string = '' + Date.now(),
  options?: IOptions
) {
  const response = await fetch(url, {
    method: options?.method,
    headers: options?.headers,
    body: options?.body,
  });

  const blob = await response.blob();
  const dataUrl = window.URL.createObjectURL(blob);

  const $link = document.createElement('a');
  $link.style.display = 'none';
  $link.href = dataUrl;
  $link.download = filename;

  document.body.appendChild($link);
  $link.click();
  window.URL.revokeObjectURL(dataUrl);
  document.body.removeChild($link);
}

export default download;
