import * as net from 'net';

// https://stackoverflow.com/questions/29069111/how-can-check-if-server-and-port-is-available-in-nodejs
export function isUp(host: string, port: number, timeout = 5000) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve(false);

      socket.end();
    }, timeout);

    const socket = net.createConnection(port, host, () => {
      clearTimeout(timer);
      resolve(true);

      socket.end();
    });

    socket.on('error', () => {
      clearTimeout(timer);
      resolve(false);
    });
  });
}

export default isUp;
