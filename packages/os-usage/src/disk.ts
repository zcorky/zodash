import { exec } from './utils';

export interface IDiskUsage {
  total: number;
  used: number;
  percent: number;
}

export async function disk(): Promise<IDiskUsage> {
  const response = await exec('df -k');
  const devices: Record<string, any> = {};
  const combined = response
    .split('\n')
    .filter((e) => /^\/dev\//.test(e))
    .map((e) => e.split(/\s+/))
    .map((e) => ({
      device: e[0],
      total: +e[1],
      used: +e[2],
      available: +e[3],
      usedPercent: e[4],
      mountPath: e[5],
    }))
    // filter the same devices in docker
    .filter((e) => {
      if (!devices[e.device]) {
        devices[e.device] = true;
        return true;
      }

      return false;
    })
    .reduce(
      (all, one) => {
        all.total += one.total;
        all.used += +one.used;
        return all;
      },
      { total: 0, used: 0 },
    );

  const total = toG(combined.total);
  const used = toG(combined.used);

  return {
    total,
    used,
    percent: ~~((used / total) * 100),
  };
}

function toG(value: number) {
  // return value >> 20; // maybe cause error
  return ~~(value / 1024 ** 2);
}
