import * as lstatuses from '../../../node_modules/statuses'; // @TODO why import from current
import * as statuses from '../src/statuses';

describe('@zodash/statuses', () => {
  it('OK === 200', () => {
    expect(lstatuses('ok')).toBe(statuses.OK);
  });

  it('CREATED === 201', () => {
    expect(lstatuses('created')).toBe(statuses.CREATED);
  });

  it('NO_CONTENT === 204', () => {
    expect(lstatuses('no content')).toBe(statuses.NO_CONTENT);
  });

  it('NOT_MODIFIED === 304', () => {
    expect(lstatuses('NOT MODIFIED')).toBe(statuses.NOT_MODIFIED);
  });

  it('BAD_REQUEST === 400', () => {
    expect(lstatuses('BAD REQUEST')).toBe(statuses.BAD_REQUEST);
  });

  it('UNAUTHORIZED === 401', () => {
    expect(lstatuses('UNAUTHORIZED')).toBe(statuses.UNAUTHORIZED);
  });

  it('FORBIDDEN === 403', () => {
    expect(lstatuses('FORBIDDEN')).toBe(statuses.FORBIDDEN);
  });

  it('NOT_FOUND === 404', () => {
    expect(lstatuses('NOT FOUND')).toBe(statuses.NOT_FOUND);
  });

  it('METHOD_NOT_ALLOWED === 405', () => {
    expect(lstatuses('METHOD NOT ALLOWED')).toBe(statuses.METHOD_NOT_ALLOWED);
  });

  it('INTERNAL_SERVER_ERROR === 500', () => {
    expect(lstatuses('INTERNAL SERVER ERROR')).toBe(
      statuses.INTERNAL_SERVER_ERROR
    );
  });

  it('BAD_GATEWAY === 502', () => {
    expect(lstatuses('BAD GATEWAY')).toBe(statuses.BAD_GATEWAY);
  });

  it('SERVICE_UNAVAILABLE === 503', () => {
    expect(lstatuses('SERVICE UNAVAILABLE')).toBe(statuses.SERVICE_UNAVAILABLE);
  });

  it('GATEWAY_TIMEOUT === 504', () => {
    expect(lstatuses('GATEWAY TIMEOUT')).toBe(statuses.GATEWAY_TIMEOUT);
  });
});
