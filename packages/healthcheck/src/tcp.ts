import * as net from 'net';

export interface ITCPOptions {
  timeout?: number;
}

export async function tcp(
  ipOrDomain: string,
  port: number,
  options?: ITCPOptions,
): Promise<boolean> {
  const timeout = options?.timeout ?? 1000;

  return new Promise<boolean>((resolve) => {
    const s = net.createConnection({ port, host: ipOrDomain, timeout });

    setTimeout(() => {
      s.destroy();
      resolve(false);
    }, timeout);

    s.on('connect', () => {
      s.end();
      return resolve(true);
    });

    s.on('error', (err) => {
      return resolve(false);
    });
  });
}
