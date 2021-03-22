export function runGenerator<T = any>(fn: () => Generator<any, T | Promise<T>, any>) {
  return new Promise<T>((resolve, reject) => {
    const gen = fn();

    function next(data?: any) {
      try {
        const result = gen.next(data);
        if (result.done) {
          return resolve(result.value);
        }
  
        toPromise(result.value)
          .then(next)
          .catch(reject);
      } catch (error) {
        // console.log('fff:', error);
        return reject(error);
      }
    }

    next();
  });
}

export function toPromise(value: any) {
  return Promise.resolve(value);
}

export default runGenerator;
