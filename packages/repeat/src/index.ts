export function repeat(times: number, value: string): string;
export function repeat<T>(times: number, value: (index: number) => T): T[];
export function repeat(times: number, value: string | Function) {
  const repeats = new Array(times).fill(value);

  if (typeof value === 'string') {
    return repeats.join('');
  }

  return repeats.map((_, index) => value.call(null, index));
}

export default repeat;
