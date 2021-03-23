import { getLogger, Logger } from '@zodash/logger';

const logger: Logger & {
  getLogger: typeof getLogger;
  setDisable: typeof Logger.setDisable;
} = new Logger('Main') as any;

logger.getLogger = getLogger;
logger.setDisable = Logger.setDisable;

export default logger;
