import * as normalization from "../utils/normalization";

describe("Two Digits", () => {
  it("Two Digits", () => {
    expect(normalization.twoDigits(1)).toBe("1.00");
    expect(normalization.twoDigits()).toBe("0.00");
    expect(normalization.twoDigits(1.34421234)).toBe("1.34");
    expect(normalization.twoDigits(1.1555)).toBe("1.16");
  });
});
