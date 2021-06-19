import * as http from 'http';
import * as fs from 'fs';

function listenExit(callback: (...args: any) => void) {
  // 中断 (Ctrl + C)
  process.on('SIGINT', callback);
  // 退出 (Ctrl + \)
  process.on('SIGQUIT', callback);
  // 中断断线 Terminal Close
  process.on('SIGHUP', callback);

  // Windows => Ctrl + Break
  process.on('SIGBREAK', callback);
}

function cleanUnixSocket(unixSocketPath: string) {
  if (fs.existsSync(unixSocketPath)) {
    fs.unlinkSync(unixSocketPath);
  }
}

export function holdOn(
  unixSocketPath: string,
  onExit: (...args: any) => void = () => null,
) {
  // cleanUnixSocket(unixSocketPath);

  const server = http.createServer();
  server.listen(unixSocketPath);

  // @TODO
  listenExit(() => {
    cleanUnixSocket(unixSocketPath);

    onExit.apply(null);
  });

  return server;
}

export default holdOn;
