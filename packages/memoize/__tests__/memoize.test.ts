import { memoize } from "../src/memoize";

function time() {
  const start = Date.now();
  return () => {
    return Date.now() - start;
  }
}

describe("@zodash/memoize", () => {
  it("memorize add", () => {
    const add = (a: number, b: number) => {
      const start = Date.now();
      
      // mock heavy task
      while (Date.now() - start < 1) {}

      return `${a} + ${b} = ${a + b}`;
    };
    const memoizedAdd = memoize(add, (a, b) => `${a + b}`);
    
    const end = time();
    for (let i = 0; i < 100; i++) {
      add(1, 99);
    }
    const delta = end();

    const endM = time();
    for (let i = 0; i < 100; i++) {
      memoizedAdd(1, 99);
    }
    const deltaM = endM();

    console.log('raw: ', delta, ' vs memoize: ', deltaM);
    expect(deltaM < delta).toBeTruthy();
  });
});
