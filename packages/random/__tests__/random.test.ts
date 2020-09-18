import random from "../src/random";

describe("@zodash/random", () => {
  it("min= 5, max = 10", () => {
    "_"
      .repeat(1000)
      .split("")
      .forEach(() => {
        const r = random.number(5, 10);
        expect(r < 10).toBeTruthy();
        expect(r >= 5).toBeTruthy();
      });
  });
});
