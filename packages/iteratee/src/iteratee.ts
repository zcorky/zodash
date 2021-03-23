export type Value<T> = T;

export type Iterator<T> = () => Value<T>;

export function iteratee<T>(data: Record<string, T>): Iterator<T>;
export function iteratee<T>(data: T[]): Iterator<T>;
export function iteratee(data: any): Iterator<any> {
  let key: number | string;
  let i = 0;
  let keys: any[];

  if (!Array.isArray(data)) {
    keys = Object.keys(data);  
  }

  return function next() {
    if (Array.isArray(data)) {
      key = i++;
    } else {
      key = keys[i++];
    }

    return data[key];
  };
}
