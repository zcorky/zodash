import * as qs from '@zcorky/query-string';
import * as pathToRegexp from 'path-to-regexp';

export function getUrl(): string {
  return window.location.href;
}

export function getQuery(key: string): string;
export function getQuery(): Record<string, string>;
export function getQuery(key?: any): any {
  const object = qs.parse(window.location.search);
  if (key) {
    return object[key];
  }

  return object;
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

export function parse(
  regStr: string,
  pathname: string,
): Record<string, string> | null {
  const regexp = pathToRegexp(regStr);
  const result = regexp.exec(pathname);
  if (!result) {
    return null;
  }

  const keys: pathToRegexp.Key[] = (regexp as any).keys ?? [];
  if (!keys.length) {
    return {};
  }

  return keys.reduce((acc, key, index) => {
    acc[key.name] = result[index + 1];
    return acc;
  }, {});
}

export function isMatch(regStr: string, pathname: string): boolean {
  return !!parse(regStr, pathname);
}
