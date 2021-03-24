export interface ISetOptions {
  /**
   * Milli Seconds
   */
  maxAge?: number;

  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'LAX' | 'None';
}

const DEFAULT_MAX_AGE = 1024 * 24 * 60 * 60 * 1000; // 1024 days

export function get(name: string) {
  const arr = getItems();

  for (let i = 0; i < arr.length; i++) {
    const [_name, _value] = arr[i].split('=');

    if (_name == name) {
      return decodeURIComponent(_value);
    }
  }
}

export function set(
  name: string,
  value: string | number | boolean | null | undefined,
  options?: ISetOptions
) {
  const maxAge =
    isNull(value) || typeof value === 'undefined'
      ? 0
      : options?.maxAge ?? DEFAULT_MAX_AGE;

  const domainStr = options?.domain ? `;domain=${options.domain}` : '';
  const pathStr = options?.path ? `;path=${options.path}` : '';
  const secureStr = options?.secure ? ';secure' : '';
  const sameSiteStr = options?.sameSite ? `;samesite=${options.sameSite}` : '';
  let expiresStr = '';

  // remove or ignore cookie
  if (maxAge <= 0) {
    const pastDate = new Date(1970, 1, 1); // Feb 1, 1970
    expiresStr = `;expires=${pastDate.toUTCString()}`;
  } else {
    const futureDate = new Date(Date.now() + maxAge);
    expiresStr = `;expires=${futureDate.toUTCString()}`;
  }

  const built = [
    `${name}=${value}`,
    domainStr,
    pathStr,
    expiresStr,
    secureStr,
    sameSiteStr,
  ].join('');

  // console.log(built);

  document.cookie = built;
}

export function remove(name: string) {
  return set(name, null, { maxAge: 0 });
}

export function getAll() {
  const arr = getItems();
  const all: Record<string, string> = {};
  for (let i = 0; i < arr.length; i++) {
    const [_name, _value] = arr[i].split('=');

    if (_name) {
      all[_name] = decodeURIComponent(_value);
    }
  }

  return all;
}

export function keys() {
  return Object.keys(getAll());
}

export function clear() {
  const allKeys = keys();
  allKeys.forEach(remove);
}

function getItems(cookie: string = document.cookie) {
  return cookie.replace(/\s/g, '').split(';');
}

function isNull(value: any) {
  return value === null;
}

export default {
  get,
  set,
  remove,
  //
  clear,
  keys,
  getAll,
  //
  getItem: get,
  setItem: set,
  removeItem: remove,
};
