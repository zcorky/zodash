import { getLogger } from '../src/logger';

describe('@zodash/logger', () => {
  it('works', (done) => {
    const logger = getLogger('module');
    const levels = [];
    logger.use(async (ctx, next) => {
      // @TODO log to backend
      // console.log();
      levels.push(ctx.input.level);
      await next();
    });

    logger.log('logger.log call');
    logger.info('logger.info call');
    logger.warn('logger.warn call');
    logger.debug('logger.debug call');
    logger.error('logger.error call');

    setTimeout(() => {
      expect(levels).toEqual(['log', 'info', 'warn', 'debug', 'error']);
      done();
    }, 0);
  });

  it('format', (done) => {
    const logger = getLogger('module');
    const levels = [];
    logger.use(async (ctx, next) => {
      // @TODO log to backend
      // console.log();
      levels.push(ctx.input.level);
      await next();
    });

    logger.log('%s format call', 'logger.log');
    logger.info('%s format call', 'logger.info');
    logger.warn('%s format call', 'logger.warn');
    logger.debug('%s format call', 'logger.debug');
    logger.error('%s format call', 'logger.error');

    setTimeout(() => {
      expect(levels).toEqual(['log', 'info', 'warn', 'debug', 'error']);
      done();
    }, 0);
  });

  it('console format', (done) => {
    const logger = getLogger('module');
    const levels = [];
    logger.use(async (ctx, next) => {
      // @TODO log to backend
      // console.log();
      levels.push(ctx.input.level);
      await next();
    });

    logger.log('logger.log', 'format call');
    logger.info('logger.info', 'format call');
    logger.warn('logger.warn', 'format call');
    logger.debug('logger.debug', 'format call');
    logger.error('logger.error', 'format call');

    setTimeout(() => {
      expect(levels).toEqual(['log', 'info', 'warn', 'debug', 'error']);
      done();
    }, 0);
  });

  it('support object in dev', (done) => {
    const logger = getLogger('module');
    const levels = [];
    logger.use(async (ctx, next) => {
      // @TODO log to backend
      // console.log();
      levels.push(ctx.input.level);
      await next();
    });

    logger.log('logger.log', [{ x: 1, y() {} }]);
    logger.info('logger.info', [{ x: 1, y() {} }]);
    logger.warn('logger.warn', [{ x: 1, y() {} }]);
    logger.debug('logger.debug', [{ x: 1, y() {} }]);
    logger.error('logger.error', [{ x: 1, y() {} }]);

    setTimeout(() => {
      expect(levels).toEqual(['log', 'info', 'warn', 'debug', 'error']);
      done();
    }, 0);
  });
});
