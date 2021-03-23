import { urlJoin } from '../src/url-join';

describe('@zodash/unfetch', () => {
  it('should work for simple case', () => {
    expect(urlJoin('http://www.google.com/', 'foo/bar', '?test=123')).toBe(
      'http://www.google.com/foo/bar?test=123'
    );
  });

  it('should be able to join protocol', function () {
    expect(urlJoin('http:', 'www.google.com/', 'foo/bar', '?test=123')).toBe(
      'http://www.google.com/foo/bar?test=123'
    );
  });

  it('should be able to join protocol with slashes', function () {
    expect(urlJoin('http://', 'www.google.com/', 'foo/bar', '?test=123')).toBe(
      'http://www.google.com/foo/bar?test=123'
    );
  });

  it('should remove extra slashes', function () {
    expect(urlJoin('http:', 'www.google.com///', 'foo/bar', '?test=123')).toBe(
      'http://www.google.com/foo/bar?test=123'
    );
  });
});
