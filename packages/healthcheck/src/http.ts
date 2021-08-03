import fz from '@zcorky/fz';

export interface IHTTPOptions {
  timeout?: number;
}

export async function http(
  url: string,
  options?: IHTTPOptions,
): Promise<boolean> {
  const timeout = options?.timeout ?? 1000;

  try {
    const response = await fz
      .get(url, {
        timeout,
      })
      .response();

    return response.status >= 200 && response.status < 400;
  } catch (error) {
    return false;
  }
}
