export function last(data?: any[]) {
  if (Array.isArray(data)) {
    return data[data.length - 1];
  }

  return undefined;
}

export default last;
