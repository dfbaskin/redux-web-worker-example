import { math } from "../mathCore";

describe("math core", () => {
  it("should compile and evaluate a formula", () => {
    const parsed = math.compile!("1 + 1");
    const result = parsed.evaluate();
    expect(result).toBe(2);
  });
});
