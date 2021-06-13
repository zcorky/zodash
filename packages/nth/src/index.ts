export function nth(data: any[], n: number) {
  if (Array.isArray(data)) {
    return data[n];
  }

  return undefined;
}

export default nth;
