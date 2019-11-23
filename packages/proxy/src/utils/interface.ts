export type Headers = Record<string, string>;

export type PathRewrite = Record<string, string>;

export interface Options {
  target: string;
  changeOrigin: boolean;
  pathRewrite: PathRewrite;
  followRedirects?: boolean;
  requestHeaders?: Headers;
  responseHeaders?: Headers;
  onError?(error: Error): void;
}

export interface RequestOptions {
  path: string;
  method: string;
  headers: Headers;
  body?: string;
  redirect?: 'follow';
}

export interface ProxyInput<T extends object> extends Omit<RequestOptions, 'body'> {
  body: T;
}

export interface ProxyOptions {
  target?: string;
  enableCache?: boolean;
}

export interface ProxyOutput<T extends object> {
  url: string;
  // headers: Headers;
  ok: boolean;
  redirected: boolean;
  status: number;
  statusText: string;
  data: T;
}

export interface ProxyServerOptions {
  method?: 'POST';
  endpoint: string;
  target: string;
  enableCache?: boolean;
}

export interface ProxyClientOptions {
  server: string;
  method: 'POST';
  endpoint: string;
  headers?: Headers;
}

export interface HandShake {
  // app <=> users
  // app
  appId?: string;
  appToken?: string;
  timestamps: number;
  // single user
  user?: any;
}

export type HandShakeMethd = (handshake: HandShake) => Promise<void>;

export interface ProxyClientRequestOptions {
  // safe
  handshake: HandShake;

  // extends headers between proxy-client <-> proxy-server
  connectProxyHeaders?: Headers;
  // extends headers between proxy-client <-> real data server
  dataProxyHeaders?: Headers;
}

export interface ProxyServerRequestOptions {
  // safe
  handshake: HandShake;

  // extends headers between proxy-server <-> real data server
  headers?: Headers;
}