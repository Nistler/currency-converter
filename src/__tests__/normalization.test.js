import * as normalization from "../utils/normalization";

describe("Two Digits", () => {
  it("Two Digits", () => {
    expect(normalization.twoDigits(1)).toBe("1.00");
    expect(normalization.twoDigits()).toBe("0.00");
    expect(normalization.twoDigits(1.34421234)).toBe("1.34");
    expect(normalization.twoDigits(1.1555)).toBe("1.16");
  });
});

describe("Time", () => {
  const offset = new Date().getTimezoneOffset();

  it("Valid timestamp", () => {
    expect(normalization.timeStampToTime(1619369179)).toBe(
      `${16 - offset / 60}:46:19`
    );
    expect(normalization.timeStampToTime(0)).toBe(`${0 - offset / 60}:00:00`);
  });

  it("With zero", () => {
    expect(normalization.timeStampToTime(0)).toBe(`${0 - offset / 60}:00:00`);
  });
});
