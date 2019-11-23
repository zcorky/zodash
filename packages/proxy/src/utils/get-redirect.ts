import { Context } from 'egg';

export function getRedirect(followRedirects?: boolean) {
  if (followRedirects) {
    return 'follow';
  }

  return undefined;
}