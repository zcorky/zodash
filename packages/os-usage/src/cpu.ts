import { exec } from './utils';

export async function cpu() {
  const response = await exec('top -bn1 | grep Cpu');
  const percent = +response.split(/\s+/)?.[1] ?? -1;

  if (percent === -1) {
    throw new Error(`cannot get cpu in ${response}`);
  }

  return percent;
}
