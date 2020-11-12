export function get(name: string) {
  const arr = getItems();
  for (let i = 0; i < arr.length; i++) {
    const [_name, _value] = arr[i].split('=');

    if (_name == name) {
      return decodeURIComponent(_value);
    }
  }

  return ;
}

export function set(name: string, value: string | number | boolean | null, days: number = 1024) {
  const date = new Date();
  date.setDate(date.getDate() + days);

  document.cookie = `${name}=${value};expires=${date}`;
}

export function remove(name: string) {
  return set(name, null, -1);
}

export function getAll() {
  const arr = getItems();
  const all: Record<string, string> = {};
  for (let i = 0; i < arr.length; i++) {
    const [_name, _value] = arr[i].split('=');

    all[_name] = decodeURIComponent(_value);
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

function getItems() {
  return document.cookie.replace(/\s/g, '').split(';');
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