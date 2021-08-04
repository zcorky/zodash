import { cpu } from './cpu';
import { memory } from './memory';
import { disk } from './disk';

export { cpu } from './cpu';
export { memory } from './memory';
export { disk } from './disk';

export async function osUsage() {
  return {
    cpu: await cpu(),
    memory: await memory(),
    disk: await disk(),
  };
}

export default osUsage;
