import * as net from 'net';

// https://stackoverflow.com/questions/29069111/how-can-check-if-server-and-port-is-available-in-nodejs
export function isUp(host: string, port: number, timeout: number = 5000) {
  return new Promise(function(resolve, reject) {
      const timer = setTimeout(function() {
          resolve(false);

          socket.end();
      }, timeout);

      const socket = net.createConnection(port, host, function() {
          clearTimeout(timer);
          resolve(true);
          
          socket.end();
      });

      socket.on('error', function (err) {
          clearTimeout(timer);
          resolve(false);
      });
  });
}

export default isUp;
