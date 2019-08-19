import { applyFormula } from "../mathEngine";

const testData = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12, 13, 14, 15]];

describe("apply formula", () => {
  it("should provide row number", () => {
    const result = applyFormula("ROW()", testData);
    expect(result).toEqual([1, 2, 3, 4]);
  });
  it("should provide row counts", () => {
    const result = applyFormula("ROWS()", testData);
    expect(result).toEqual([4, 4, 4, 4]);
  });
  it("should provide column counts", () => {
    const result = applyFormula("COLUMNS()", testData);
    expect(result).toEqual([6, 6, 6, 6]);
  });
  it("should reference column data", () => {
    const result = applyFormula("C2", testData);
    expect(result).toEqual([2, 5, 8, 11]);
  });
  it("should use column data in formula", () => {
    const result = applyFormula("C1 inch to cm", testData);
    expect(result.map(v => v.toString())).toEqual([
      "2.54 cm",
      "10.16 cm",
      "17.779999999999998 cm",
      "25.4 cm"
    ]);
  });
});
