export function observe<T extends object>(
  target: T,
  callback: (key: string | symbol, value: string) => void,
) {
  return new Proxy(target, {
    set(target, property, value, receiver) {
      callback(property, value);
      return Reflect.set(target, property, value, receiver);
    },
  });
}

export default observe;
