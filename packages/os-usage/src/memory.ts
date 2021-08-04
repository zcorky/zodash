import { exec } from './utils';

export interface IMemoryUsage {
  total: number;
  used: number;
  percent: number;
}

export async function memory(): Promise<IMemoryUsage> {
  const response = await exec('free -m');
  const text = response.split('\n').find((e) => /^Mem:/.test(e));

  if (!text) {
    throw new Error(`cannot get memory in ${response}`);
  }

  const combined = text.split(/\s+/);
  const total = +combined[1];
  const available = +combined[6];
  const used = total - available;

  const percent = ~~((used / total) * 100);

  return {
    total,
    used,
    percent,
  };
}
