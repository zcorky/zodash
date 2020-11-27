import { getLogger, Logger } from '@zodash/logger';

const logger: Logger & { getLogger: typeof getLogger } = new Logger('Main') as any;

logger.getLogger = getLogger;

export default logger;
