type Fetch = typeof fetch;
type Params = Parameters<Fetch>;

export type Options = Params[1]; 
// export type Response = ReturnType<Fetch>;

export interface UnfetchResponse {
  ok: boolean;
  statusText: string;
  status: number;
  url: string;
  text(): Promise<string>;
  json<T = any>(): Promise<T>;
  blob(): Promise<Blob>;
  clone(): UnfetchResponse;
  headers: {
    keys(): string[];
    entries(): [string, string][];
    get(name: string): string;
    has(name: string): boolean;
  }
}

export function unfetch(url: string, options?: Options) {
  const _options = options || {};

  return new Promise<UnfetchResponse>((resolve, reject) => {
    const request = new XMLHttpRequest();
    const keys = [];
    const all = [];
    const headers = {};

    const response = () => ({
      ok: (request.status / 100 | 0) == 2,
      statusText: request.statusText,
      status: request.status,
      url: request.responseURL,
      text: () => Promise.resolve(request.responseText),
      json: () => Promise.resolve(JSON.parse(request.responseText)),
      blob: () => Promise.resolve(new Blob([request.response])),
      clone: response,
      headers: {
        keys: () => keys,
        entries: () => all,
        get: (name: string) => headers[name.toLowerCase()],
        has: (name: string) => name.toLowerCase() in headers,
      },
    });

    request.open(_options.method || 'get', url, true);

    request.responseType

    request.onload = () => {
      request.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, (m: string, key: string, value: string) => {
        keys.push(key = key.toLowerCase());
        all.push([key, value]);
        headers[key] = headers[key] ? `${headers[key]},${value}` : value;
        return '';
      });
      resolve(response()); // @TODO not the same as fetch Response
    };

    request.onerror = reject;

    request.withCredentials = _options.credentials === 'include';

    for (const key in _options.headers) {
      request.setRequestHeader(key, _options.headers[key]);
    }

    request.send(_options.body || null);
  });
}