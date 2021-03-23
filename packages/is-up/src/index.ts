import http from './http';
import tcp from './tcp';

export type IHTTPOptions = {
  type: 'http';
  url: string;
};

export type ITCPOptions = {
  type: 'tcp';
  host: string;
  port: number;
};

export type IOptions = {
  timeout?: number;
} & (IHTTPOptions | ITCPOptions);

export async function isUp(options: string | IOptions) {
  // http
  if (typeof options === 'string') {
    return http(options);
  }

  // http
  if (options?.type === 'http') {
    return http(options.url, options.timeout);
  }

  // tcp
  if (options?.type === 'tcp') {
    return tcp(options.host, options.port, options.timeout);
  }

  //
  throw new Error(`unknown options: ${JSON.stringify(options)}`);
}

export default isUp;
