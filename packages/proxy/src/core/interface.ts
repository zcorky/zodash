import { Response } from 'node-fetch';

/**
 * Request/Response Headers
 */
export type Headers = Record<string, string>;

/**
 * Client Request Body
 * 
 * Request Body, is the data which client sent to server.
 * Also the proxy request data (method, path, headers, body),
 *  and handshake + target is the property @TODO should have better positions or
 *  using better request body structure.
 */
export interface RequestBody {
  method: string;
  path: string;
  headers: Headers;
  body: any;
  handshake?: any;
  target?: string;
}

// export interface RequestProxyBody {
//   method: string;
//   path: string;
//   headers: Headers;
//   body: any;
// }

// /**
//  * Client Request Attributes
//  */
// export interface RequestProxyAttributes {
//   handshake?: any;
//   target?: string;
// }

/**
 * Hand Shake Data
 */
export interface HandShake {
  // app <=> users
  // app
  appId?: string;
  appToken?: string;
  timestamps: number;
  // single user
  user?: any;
}

/**
 * Server Response Body
 */
export type ResponseBody = Response;

// Proxy Server - START

/**
 * ProxyServer Config
 */
export interface ProxyServerConfig {
  method?: 'POST';
  endpoint: string;
  target: string;
  enableCache?: boolean;
  usingClientTargetIfExist?: boolean;
}

/**
 * ProxyServer Request Options
 */
export interface ProxyServerRequestOptions {
  // safe
  handshake: HandShake;

  // extends headers between proxy-server <-> real data server
  headers?: Headers;
}

/**
 * ProxyServer Hand Shake Method
 *  using for:
 *    1 authentication
 *    2 permission
 *    3 rate limit
 * 
 *  how to:
 *    if not validate, throw error with status and message
 */
export type HandShakeMethd = (handshake: HandShake) => Promise<void>;

// Proxy Server - END

// Proxy Client - START

/**
 * ProxyClient Config
 */
export interface ProxyClientConfig {
  server: string;
  method: 'POST';
  endpoint: string;
  headers?: Headers;
}

/**
 * ProxyClient Request Options
 */
export interface ProxyClientRequestOptions {
  // safe
  handshake: HandShake;

  // dynamic target, this only works when server enable using client target
  target?: string;

  // extends headers between proxy-client <-> proxy-server
  connectProxyHeaders?: Headers;
  // extends headers between proxy-client <-> real data server
  dataProxyHeaders?: Headers;
}

// Proxy Client - END

// export type PathRewrite = Record<string, string>;

// export interface Options {
//   target: string;
//   changeOrigin: boolean;
//   pathRewrite: PathRewrite;
//   followRedirects?: boolean;
//   requestHeaders?: Headers;
//   responseHeaders?: Headers;
//   onError?(error: Error): void;
// }

// export interface RequestOptions {
//   path: string;
//   method: string;
//   headers: Headers;
//   body?: string;
//   redirect?: 'follow';
// }

// export interface ProxyOptions {
//   target?: string;
//   usingClientTarget?: boolean;
//   enableCache?: boolean;
// }
