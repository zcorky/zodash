/**
 * Nginx Log Format
 *
 * log_format main  '$remote_addr - $remote_user [$time_local] "$request" '
 *               '$request_time $request_length '
 *               '$status $body_bytes_sent "$http_referer" '
 *               '"$http_user_agent"';
 */

export interface D {
  method: string;
  path: string;
  status: number;
  userAgent?: string;
  addr?: string;
  user?: string;
  datetime: string;
  version: string;
  requestTime: number;
  contentLength?: number;
  bodyBytesSent?: number;
  referer?: string;
}

export function format(data: D) {
  return (
    `${data.addr} - ${data.user || '-'} [${data.datetime}] "${data.method} ${
      data.path
    } HTTP/${data.version || '-'}" `
    + `${data.requestTime} ${data.contentLength} `
    + `${data.status} ${data.bodyBytesSent} "${data.referer || '-'}" `
    + `"${data.userAgent || '-'}"`
  );
}
