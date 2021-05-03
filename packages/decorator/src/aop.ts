export function pre(fn: (...args: any[]) => void) {
  return <T>(
    _target: any,
    _propertyKey: PropertyKey,
    descriptor: TypedPropertyDescriptor<T>
  ) => {
    const method = descriptor.value as any;
    descriptor.value = async function (...args: any[]) {
      await fn.apply(this, args);

      return await method.apply(this, args);
    } as any;

    return descriptor;
  };
}

export function post(fn: (output: any, input: any[]) => void) {
  return <T>(
    _target: any,
    _propertyKey: PropertyKey,
    descriptor: TypedPropertyDescriptor<T>
  ) => {
    const method = descriptor.value as any;
    descriptor.value = async function (...args: any[]) {
      const output = await method.apply(this, args);

      return await fn.apply(this, [output, args]);
    } as any;

    return descriptor;
  };
}
