// import * as icmp from 'icmp';

export async function ping(ip: string): Promise<boolean> {
  // const timeout = 1000;

  // try {
  //   await icmp.ping(ip, timeout);
  //   return true;
  // } catch (error) {
  //   console.error(error);
  //   return false;
  // }

  throw new Error('ping is unsupported currently');
}
