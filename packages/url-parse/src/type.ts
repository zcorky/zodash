export interface ParsedURL {
  href: string;
  origin: string;
  protocol: string;
  scheme: string;
  auth?: string;
  username?: string;
  password?: string;
  host: string;
  hostname: string;
  port?: string;
  path?: string;
  pathname?: string;
  search?: string;
  query?: string;
  hash?: string;
}
