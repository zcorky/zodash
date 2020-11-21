export function extend(target: object, args: object) {
  for (const key in args) {
    if (Object.prototype.hasOwnProperty.call(args, key)) {
      target[key] = args[key];
    }
  }
}

export default extend;
