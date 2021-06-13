export function first(data?: any[]) {
  if (Array.isArray(data)) {
    return data[0];
  }

  return undefined;
}

export default first;
