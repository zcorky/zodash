import { Logger } from '@zodash/logger';

const logger = new Logger('COMMON');

export default function debug(message: string, ...args: any[]) {
  if (process.env.NODE_ENV === 'production') {
    return ;
  }

  logger.debug(message, ...args);
}
