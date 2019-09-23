import { getLogger } from '../src/logger';

describe("@zodash/logger", () => {
  it('works', (done) => {
    const logger = getLogger('test');
    const levels = [];
    logger.use(async (ctx, next) => {
      // @TODO log to backend
      // console.log();
      levels.push(ctx.input.level);
      await next();
    });
    
    logger.log(`logger.log call`);
    logger.info(`logger.info call`);
    logger.warn(`logger.warn call`);
    logger.debug(`logger.debug call`);
    logger.error(`logger.error call`);

    setTimeout(() => {
      expect(levels).toEqual(['log', 'info', 'warn', 'debug', 'error']);
      done();
    }, 0);
  });
});
