import { Logger } from '@zodash/logger';

const logger = new Logger('COMMON');

export function debug(message: string, ...args: any[]) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  logger.debug(message, ...args);
}

export default debug;
