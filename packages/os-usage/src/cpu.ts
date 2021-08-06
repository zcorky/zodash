// import { exec } from './utils';

// export async function cpu() {
//   const response = await exec('top -bn1 | grep Cpu');
//   const percent = +response.split(/\s+/)?.[1] ?? -1;

//   if (percent === -1) {
//     throw new Error(`cannot get cpu in ${response}`);
//   }

//   return percent;
// }

/**
 * Inpsired by os-utils
 */
import * as os from 'os';

export async function cpu(free = false) {
  const stats1 = await getCPUInfo();
  const startIdle = stats1.idle;
  const startTotal = stats1.total;

  return new Promise<number>((resolve) => {
    setTimeout(async function () {
      const stats2 = await getCPUInfo();
      const endIdle = stats2.idle;
      const endTotal = stats2.total;

      const idle = endIdle - startIdle;
      const total = endTotal - startTotal;
      const perc = ~~((idle / total) * 100).toFixed(1);

      if (free === true) {
        resolve(perc);
      } else {
        resolve(100 - perc);
      }
    }, 500);
  });
}

async function getCPUInfo() {
  const cpus = os.cpus();

  let user = 0;
  let nice = 0;
  let sys = 0;
  let idle = 0;
  let irq = 0;
  let total = 0;

  for (const cpu in cpus) {
    if (!cpus.hasOwnProperty(cpu)) continue;
    user += cpus[cpu].times.user;
    nice += cpus[cpu].times.nice;
    sys += cpus[cpu].times.sys;
    irq += cpus[cpu].times.irq;
    idle += cpus[cpu].times.idle;
  }

  total = user + nice + sys + idle + irq;

  return {
    idle,
    total,
  };
}
