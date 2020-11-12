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