export function unique<T>(array: T[], by: (value: T) => string): T[];
export function unique<T>(array: T[]): T[];
export function unique<T>(array?: T[], by?: (value: T) => string) {
  return Object.values(
    array.reduce((all, value) => {
      const key =
        typeof by === 'function' ? by(value) : ((value as any) as string);
      all[key] = value;
      return all;
    }, {} as { [key: string]: T }),
  );
}
