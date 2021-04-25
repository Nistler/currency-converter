import * as calculations from "../utils/calculations";

describe("Convertation", () => {
  it("Empty parameters", () => {
    expect(calculations.convertation()).toBe(1);
  });
  it("Only amount", () => {
    expect(calculations.convertation(1)).toBe(1);
  });
  it("Amount and rate", () => {
    expect(calculations.convertation(1, 2)).toBe(2);
  });
});

describe("Validation", () => {
  it("Valid string", () => {
    expect(calculations.validation("123 usd in eur".split(" "))).toBeTruthy();
  });
  it("Invalid string", () => {
    expect(calculations.validation("usd in eur".split(" "))).toBeFalsy();
    expect(calculations.validation("123 in eur".split(" "))).toBeFalsy();
    expect(calculations.validation("".split(" "))).toBeFalsy();
    expect(calculations.validation("one".split(" "))).toBeFalsy();
  });
});
