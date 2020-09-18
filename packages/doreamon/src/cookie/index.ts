export function get(name: string) {
  const arr = document.cookie.replace(/\s/g, '').split(';');
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

export default {
  get,
  set,
  remove,
};