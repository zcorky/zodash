import { cpu } from './cpu';
import { memory, MemoryUsage } from './memory';
import { disk, DiskUsage } from './disk';

export * from './cpu';
export * from './memory';
export * from './disk';

export interface OsUsage {
  cpu: number;
  memory: MemoryUsage;
  disk: DiskUsage;
}

export async function osUsage(): Promise<OsUsage> {
  return {
    cpu: await cpu(),
    memory: await memory(),
    disk: await disk(),
  };
}

export default osUsage;
