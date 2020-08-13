export function default_(value: any) {
  return (target: any, propertyKey: PropertyKey) => {
    if (typeof target[propertyKey] === 'undefined') {
      target[propertyKey] = value;
    }
  };
}
