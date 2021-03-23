export interface Value<T> {
  done: boolean;
  value?: T;
}

export interface Generator<T> {
  next(): Value<T>;
}

export function generatee<T>(data: Record<string, T>): Generator<T>;
export function generatee<T>(data: T[]): Generator<T>;
export function generatee(data: any): Generator<any> {
  let len: number;
  let key: number | string;
  let i = 0;
  let keys: any[];
  const isArray = Array.isArray(data);

  if (isArray) {
    len = data.length;
  } else {
    keys = Object.keys(data);
    len = keys.length;
  }

  return {
    next() {
      const done = i >= len;

      if (done) {
        return {
          done: true,
          value: undefined,
        };
      }

      if (isArray) {
        key = i++;
      } else {
        key = keys[i++];
      }

      return {
        done,
        value: data[key],
      };
    },
  };
}
