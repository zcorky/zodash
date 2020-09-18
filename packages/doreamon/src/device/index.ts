import Device from '@zcorky/device';

export function device(ua?: string) {
  return new Device(ua);
}

export default device;
