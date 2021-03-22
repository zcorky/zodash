export function runGenerator(fn: GeneratorFunction) {
  const gen = fn();

  function next(err?: Error, data?: any) {
    const result = gen.next(data);
    if (result.done) return ;
    result.value(next);
  }

  next();
}

export default runGenerator;
