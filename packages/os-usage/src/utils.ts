import * as cp from 'child_process';

export async function exec(command: string) {
  return new Promise<string>((resolve, reject) => {
    cp.exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }

      return resolve(stdout);
    });
  });
}
