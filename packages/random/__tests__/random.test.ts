import random from "../src/random";

describe("@zodash/random", () => {
  it("number(max, min)", () => {
    "_"
      .repeat(10)
      .split("")
      .forEach(() => {
        const r = random.number(10, 5);
        expect(r < 10).toBeTruthy();
        expect(r >= 5).toBeTruthy();

        expect(random.number() < 10).toBeTruthy();
        expect(random.number() >= 0).toBeTruthy();
      });

      // const max = 1231231231231230;
      // console.log('xxx:', ~~(max), random.number(max, max));
      // expect(random.number(max, max)).toEqual(max);
      // expect(random.number(max, max - 10)).toBeLessThan(max);
      // expect(random.number(max, max - 10)).toBeGreaterThanOrEqual(max - 10);
  });

  it("string", () => {
    expect(random.string().length).toBe(10);
    expect(random.string(6).length).toBe(6);
    expect(random.string(10).length).toBe(10);
  });

  it("shortid", () => {
    expect(random.shortid().length).toBe(8);
  });

  it("code", () => {
    expect(random.code().length).toBe(24);
  });

  it("token", () => {
    expect(random.token().length).toBe(32);
  });

  it("key", () => {
    expect(random.key().length).toBe(32);
  });

  it("password", () => {
    expect(random.password().length).toBe(16);
  });

  it("secret", () => {
    expect(random.secret().length).toBe(32);
  });

  it("captcha", () => {
    expect(random.captcha().length).toBe(6);
    expect(random.captcha().split('').every(e => /\d+/.test(e))).toBeTruthy();
  });
});
