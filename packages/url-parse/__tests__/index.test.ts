// import Base64 from 'crypto-js/enc-base64';
import parseUrl, { parse } from '../src';

describe('@zodash/url-parse', () => {
  it('url', () => {
    const data = {
      input: 'http://user:pass@host.com:8080/path/to/file?query=string#hash',
      expected: {
        href: 'http://user:pass@host.com:8080/path/to/file?query=string#hash',
        origin: 'http://user:pass@host.com:8080',
        protocol: 'http:',
        scheme: 'http',
        auth: 'user:pass',
        username: 'user',
        password: 'pass',
        host: 'host.com:8080',
        hostname: 'host.com',
        port: '8080',
        path: '/path/to/file?query=string',
        pathname: '/path/to/file',
        search: '?query=string',
        query: 'query=string',
        hash: '#hash',
      },
    };

    expect(parse(data.input)).toEqual(data.expected);
    expect(parseUrl(data.input)).toEqual(data.expected);
  });

  it('invalid', () => {
    const data = {
      input: '//user:pass@host.com:8080/path/to/file?query=string#hash',
      expected: null,
    };

    expect(parse(data.input)).toEqual(data.expected);
    expect(parseUrl(data.input)).toEqual(data.expected);
  });

  it('has auth without pass', () => {
    const data = {
      input: 'http://user:@host.com:8080/path/to/file?query=string#hash',
      expected: {
        href: 'http://user:@host.com:8080/path/to/file?query=string#hash',
        origin: 'http://user:@host.com:8080',
        protocol: 'http:',
        scheme: 'http',
        auth: 'user:',
        username: 'user',
        password: undefined,
        host: 'host.com:8080',
        hostname: 'host.com',
        port: '8080',
        path: '/path/to/file?query=string',
        pathname: '/path/to/file',
        search: '?query=string',
        query: 'query=string',
        hash: '#hash',
      },
    };

    expect(parse(data.input)).toEqual(data.expected);
    expect(parseUrl(data.input)).toEqual(data.expected);
  });

  it('has auth without pass 2', () => {
    const data = {
      input: 'http://user@host.com:8080/path/to/file?query=string#hash',
      expected: {
        href: 'http://user@host.com:8080/path/to/file?query=string#hash',
        origin: 'http://user@host.com:8080',
        protocol: 'http:',
        scheme: 'http',
        auth: 'user',
        username: 'user',
        password: undefined,
        host: 'host.com:8080',
        hostname: 'host.com',
        port: '8080',
        path: '/path/to/file?query=string',
        pathname: '/path/to/file',
        search: '?query=string',
        query: 'query=string',
        hash: '#hash',
      },
    };

    expect(parse(data.input)).toEqual(data.expected);
    expect(parseUrl(data.input)).toEqual(data.expected);
  });

  it('no auth', () => {
    const data = {
      input: 'http://host.com:8080/path/to/file?query=string#hash',
      expected: {
        href: 'http://host.com:8080/path/to/file?query=string#hash',
        origin: 'http://host.com:8080',
        protocol: 'http:',
        scheme: 'http',
        auth: undefined,
        username: undefined,
        password: undefined,
        host: 'host.com:8080',
        hostname: 'host.com',
        port: '8080',
        path: '/path/to/file?query=string',
        pathname: '/path/to/file',
        search: '?query=string',
        query: 'query=string',
        hash: '#hash',
      },
    };

    expect(parse(data.input)).toEqual(data.expected);
    expect(parseUrl(data.input)).toEqual(data.expected);
  });

  it('no hash', () => {
    const data = {
      input: 'http://host.com:8080/path/to/file?query=string',
      expected: {
        href: 'http://host.com:8080/path/to/file?query=string',
        origin: 'http://host.com:8080',
        protocol: 'http:',
        scheme: 'http',
        auth: undefined,
        username: undefined,
        password: undefined,
        host: 'host.com:8080',
        hostname: 'host.com',
        port: '8080',
        path: '/path/to/file?query=string',
        pathname: '/path/to/file',
        search: '?query=string',
        query: 'query=string',
        hash: undefined,
      },
    };

    expect(parse(data.input)).toEqual(data.expected);
    expect(parseUrl(data.input)).toEqual(data.expected);
  });

  it('no query', () => {
    const data = {
      input: 'http://host.com:8080/path/to/file?',
      expected: {
        href: 'http://host.com:8080/path/to/file?',
        origin: 'http://host.com:8080',
        protocol: 'http:',
        scheme: 'http',
        auth: undefined,
        username: undefined,
        password: undefined,
        host: 'host.com:8080',
        hostname: 'host.com',
        port: '8080',
        path: '/path/to/file?',
        pathname: '/path/to/file',
        search: '?',
        query: undefined,
        hash: undefined,
      },
    };

    expect(parse(data.input)).toEqual(data.expected);
    expect(parseUrl(data.input)).toEqual(data.expected);
  });

  it('no search', () => {
    const data = {
      input: 'http://host.com:8080/path/to/file',
      expected: {
        href: 'http://host.com:8080/path/to/file',
        origin: 'http://host.com:8080',
        protocol: 'http:',
        scheme: 'http',
        auth: undefined,
        username: undefined,
        password: undefined,
        host: 'host.com:8080',
        hostname: 'host.com',
        port: '8080',
        path: '/path/to/file',
        pathname: '/path/to/file',
        search: undefined,
        query: undefined,
        hash: undefined,
      },
    };

    expect(parse(data.input)).toEqual(data.expected);
    expect(parseUrl(data.input)).toEqual(data.expected);
  });

  it('no path', () => {
    const data = {
      input: 'http://host.com:8080',
      expected: {
        href: 'http://host.com:8080',
        origin: 'http://host.com:8080',
        protocol: 'http:',
        scheme: 'http',
        auth: undefined,
        username: undefined,
        password: undefined,
        host: 'host.com:8080',
        hostname: 'host.com',
        port: '8080',
        path: undefined,
        pathname: undefined,
        search: undefined,
        query: undefined,
        hash: undefined,
      },
    };

    expect(parse(data.input)).toEqual(data.expected);
    expect(parseUrl(data.input)).toEqual(data.expected);
  });

  it('no port', () => {
    const data = {
      input: 'http://host.com',
      expected: {
        href: 'http://host.com',
        origin: 'http://host.com',
        protocol: 'http:',
        scheme: 'http',
        auth: undefined,
        username: undefined,
        password: undefined,
        host: 'host.com',
        hostname: 'host.com',
        port: undefined,
        path: undefined,
        pathname: undefined,
        search: undefined,
        query: undefined,
        hash: undefined,
      },
    };

    expect(parse(data.input)).toEqual(data.expected);
    expect(parseUrl(data.input)).toEqual(data.expected);
  });

  it('scheme / protocol', () => {
    const data = {
      input: 'https://host.com',
      expected: {
        href: 'https://host.com',
        origin: 'https://host.com',
        protocol: 'https:',
        scheme: 'https',
        auth: undefined,
        username: undefined,
        password: undefined,
        host: 'host.com',
        hostname: 'host.com',
        port: undefined,
        path: undefined,
        pathname: undefined,
        search: undefined,
        query: undefined,
        hash: undefined,
      },
    };

    expect(parse(data.input)).toEqual(data.expected);
    expect(parseUrl(data.input)).toEqual(data.expected);
  });
});
