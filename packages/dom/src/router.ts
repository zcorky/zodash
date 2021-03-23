import { parse } from '@zcorky/query-string';

export function getUrl(): string {
  return window.location.href;
}

export function getQuery(): Record<string, string> {
  return parse(window.location.search);
}

export function getLocation() {
  return window.location;
}

export function go(url: string, canGoBack = true) {
  if (!canGoBack) {
    return window.location.replace(url);
  }

  window.location.href = url;
}

export function navigate(url: string, canGoBack = true) {
  return go(url, canGoBack);
}
