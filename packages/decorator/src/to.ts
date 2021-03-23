export function number() {
  return <T>(
    target: any,
    propertyKey: PropertyKey,
    descriptor: TypedPropertyDescriptor<T>,
  ) => {
    // getter
    if (descriptor.get) {
      const oldGetter = descriptor.get;
      descriptor.get = function () {
        return +oldGetter.apply(this);
      } as any;
    }

    // method
    if (typeof descriptor.value === 'function') {
      const method = descriptor.value;
      descriptor.value = function (...args: any[]) {
        return +method.apply(this, args);
      } as any;
    }

    // descriptor.writable = false;
    return descriptor;
  };
}

export function bool() {
  // false enums
  const falseEnums = ['f', 'false', '0'];

  const isFalse = (value: string) => {
    const _v = String(value).toLowerCase();

    return !falseEnums.includes(_v);
  };

  return <T>(
    target: any,
    propertyKey: PropertyKey,
    descriptor: TypedPropertyDescriptor<T>,
  ) => {
    // getter
    if (descriptor.get) {
      const oldGetter = descriptor.get;
      descriptor.get = function () {
        const value = oldGetter.apply(this);
        return isFalse(value);
      } as any;
    }

    // method
    if (typeof descriptor.value === 'function') {
      const method = descriptor.value;
      descriptor.value = function (...args: any[]) {
        const value = method.apply(this, args);
        return isFalse(value);
      } as any;
    }

    // descriptor.writable = false;
    return descriptor;
  };
}
