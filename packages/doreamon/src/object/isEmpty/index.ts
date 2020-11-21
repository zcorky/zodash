export function isEmpty(obj: object) {
  for (const key in obj) {
    return false;
  }

  return true;
}

export default isEmpty;
