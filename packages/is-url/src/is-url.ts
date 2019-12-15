
export function isUrl(maybeUrl: string) {
  // @TODO for dynamic data
  if (typeof maybeUrl !== 'string') {
    return false;
  }

  return /https?:\/\//.test(maybeUrl);
}