const version = '1.0.1';

export function getUserAgent() {
  const appName = 'Ghost Proxy Hub';
  const appVersion = version;

  return `${appName}/${appVersion}`;
}