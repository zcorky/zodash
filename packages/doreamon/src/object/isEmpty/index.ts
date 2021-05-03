export function isEmpty(obj: object) {
  for (const _key in obj) {
    return false;
  }

  return true;
}

export default isEmpty;
