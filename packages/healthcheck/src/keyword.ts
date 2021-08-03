import fz from '@zcorky/fz';

export interface IKeywordOptions {
  timeout?: number;
}

export async function keyword(
  url: string,
  word: string | string[],
  options?: IKeywordOptions,
): Promise<boolean> {
  const words = !Array.isArray(word) ? [word] : word;
  const timeout = options?.timeout ?? 1000;

  try {
    const response = await fz
      .get(url, {
        timeout,
      })
      .text();

    return words.some((word) => response.includes(word));
  } catch (error) {
    return false;
  }
}
