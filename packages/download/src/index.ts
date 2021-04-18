import { saveAs } from '@zodash/save-as';

export interface IOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: string;
}

export async function download(
  url: string,
  filename = `${Date.now()}`,
  options?: IOptions
) {
  const response = await fetch(url, {
    method: options?.method,
    headers: options?.headers,
    body: options?.body,
  });

  const blob = await response.blob();
  return saveAs(blob, filename);
}

export default download;
