import { stringify } from '@zcorky/query-string';
import { object as isObject, func as isFunc } from '@zcorky/is';

// export namespace Ajax {
//   function get<T = any>(url: string, success: (data: T) => void, dataType?: string): XMLHttpRequest;
//   function get<T = any>(url: string, data: string | Record<string, string> | null, success: (data: T) => void, dataType?: string): XMLHttpRequest;
//   function post<T = any>(url: string, success: (data: T) => void, dataType?: string): XMLHttpRequest;
//   function post<T = any>(url: string, data: string | Record<string, string> | null, success: (data: T) => void, dataType?: string): XMLHttpRequest;
// }

export interface Options {
  type?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  data?: string | {};
  dataType?: 'json' | 'xml';
  contentType?: string;
  success?<T = any>(data: T, xhr: XMLHttpRequest): void;
  error?(xhr: XMLHttpRequest, reason?: 'timeout' | string): void;
  complete?(xhr: XMLHttpRequest): void;
  timeout?: number;
}

export function ajax(options: Options): XMLHttpRequest {
  const {
    type = 'GET' as const,
    success,
    error,
    complete,
    dataType = 'json',
    contentType = 'application/x-www-form-urlencoded',
    timeout = 0,
  } = options ?? {};

  let url = options?.url;
  let data = options?.data || {};
  let abortTimeout: NodeJS.Timeout;

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) return;

    clearTimeout(abortTimeout);
    let result;

    const status = xhr.status;
    if ((status >= 200 && status < 300) || status === 304) {
      result = xhr.responseText;

      if (dataType === 'xml') {
        result = xhr.responseXML;
      }

      try {
        if (dataType === 'json') {
          result = JSON.parse(result);
        }
      } catch (e) {}

      success?.(result, xhr);
    } else {
      error?.(xhr);
    }

    complete?.(xhr);
  };

  if (type === 'GET') {
    data = stringify(data);
    url += url.indexOf('?') > -1 ? `&${data}` : `?${data}`;
  } else if (
    contentType === 'application/x-www-form-urlencoded' &&
    isObject(data)
  ) {
    data = stringify((data as any) as {});
  } else if (contentType === 'application/json' && isObject(data)) {
    data = JSON.stringify(data);
  }

  xhr.open(type, url, true);
  xhr.setRequestHeader('Content-Type', contentType);

  if (timeout > 0) {
    abortTimeout = setTimeout(() => {
      xhr.onreadystatechange = () => {};
      xhr.abort();
      error?.(xhr, 'timeout');
      complete?.(xhr);
    }, timeout);
  }

  xhr.send(type === 'GET' ? null : ((data as any) as string));

  return xhr;
}

export function get<T = any>(
  url: string,
  success: (data: T) => void,
  dataType?: string
): XMLHttpRequest;
export function get<T = any>(
  url: string,
  data: string | Record<string, string> | null,
  success: (data: T) => void,
  dataType?: string
): XMLHttpRequest;
export function get(
  url: any,
  data: any,
  success: any,
  dataType?: any
): XMLHttpRequest {
  if (isFunc(data)) {
    return ajax({
      url,
      data: {},
      dataType: success,
      success: data,
    });
  }

  return ajax({
    url,
    data,
    dataType,
    success,
  });
}

export function post<T = any>(
  url: string,
  success: (data: T) => void,
  dataType?: string
): XMLHttpRequest;
export function post<T = any>(
  url: string,
  data: string | Record<string, string> | null,
  success: (data: T) => void,
  dataType?: string
): XMLHttpRequest;
export function post(
  url: any,
  data: any,
  success: any,
  dataType?: any
): XMLHttpRequest {
  if (isFunc(data)) {
    return ajax({
      type: 'POST',
      url,
      data: {},
      dataType: success,
      success: data,
    });
  }

  return ajax({
    type: 'POST',
    url,
    data,
    dataType,
    success,
  });
}

export default ajax;
