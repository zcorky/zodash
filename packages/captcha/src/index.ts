import * as svgCaptcha from 'svg-captcha';
import random from '@zodash/random';

export type IOptions = {
  type?: 'image';
} | {
  type?: 'code';
  length?: number; // default 6
}

export function create(options?: IOptions) {
  const type = options?.type || 'image';

  switch(type) {
    case 'image':
      return createSvgCaptcha();
    case 'code':
      return createCodeCaptch((options as any)?.length);
    default:
      throw new Error(`Unknow type: ${type}`);
  }
}

export function createSvgCaptcha() {
  const _ = svgCaptcha.create();

  return {
    type: 'svg',
    code: _.text,
    data: _.data,
  };
}

export function createCodeCaptch(len: number) {
  const code = random.string(+len || 6);

  return {
    type: 'code',
    code,
    data: code,
  };
}

export default create;
