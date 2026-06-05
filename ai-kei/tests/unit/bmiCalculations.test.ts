import { describe, expect, it } from "vitest";
import {
  calculateBmi,
  calculateDifferenceFromStandardWeight,
  calculateStandardWeight,
  getBmiCategory,
  roundToFirstDecimal
} from "../../src/utils/bmiCalculations";

describe("bmi calculations", () => {
  it("calculates BMI to one decimal place", () => {
    expect(calculateBmi(170, 65)).toBe(22.5);
  });

  it("calculates standard weight to one decimal place", () => {
    expect(calculateStandardWeight(170)).toBe(63.6);
  });

  it("calculates difference from standard weight", () => {
    expect(calculateDifferenceFromStandardWeight(170, 65)).toBe(1.4);
    expect(calculateDifferenceFromStandardWeight(170, 60)).toBe(-3.6);
  });

  it("handles category boundaries correctly", () => {
    expect(getBmiCategory(18.49)).toBe("低体重");
    expect(getBmiCategory(18.5)).toBe("普通体重");
    expect(getBmiCategory(24.99)).toBe("普通体重");
    expect(getBmiCategory(25)).toBe("肥満(1度)");
    expect(getBmiCategory(30)).toBe("肥満(2度)");
    expect(getBmiCategory(35)).toBe("肥満(3度)");
    expect(getBmiCategory(40)).toBe("肥満(4度)");
  });

  it("round helper rounds to one decimal place", () => {
    expect(roundToFirstDecimal(63.647)).toBe(63.6);
    expect(roundToFirstDecimal(63.65)).toBe(63.7);
  });
});
