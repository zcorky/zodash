import { each } from '@zodash/each';
import { IExt, IMimeType } from './type';
import { MAP_MIME_EXTS } from './data';

const mimeTypes: Record<IExt, IMimeType> = {};

each(MAP_MIME_EXTS, ([mimeType, exts]) => {
  each(exts, (ext) => {
    mimeTypes[ext] = mimeType;
  });
});

export function isMimeType(name: IMimeType) {
  return name.indexOf('/') > 0;
}

export function getType(name: IExt) {
  return mimeTypes[name];
}

export function getExt(name: IMimeType) {
  if (MAP_MIME_EXTS[name]) {
    return MAP_MIME_EXTS[name][0];
  }
}

export function mime(name: IExt): IMimeType;
export function mime(name: IMimeType): IExt;
export function mime(name: any) {
  if (isMimeType(name)) {
    return getExt(name);
  }

  return getType(name);
}

export default mime;
