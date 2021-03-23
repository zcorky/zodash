import 'reflect-metadata';

export const CLASS_KEY = 'ioc:tagged_class';

export function Provider(serviceName: string, args?: any[]) {
  return function (target: any) {
    Reflect.defineMetadata(
      CLASS_KEY,
      {
        id: serviceName,
        args: args || [],
      },
      target,
    );
  };
}
