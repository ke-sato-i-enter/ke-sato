import { describe, expect, it } from "vitest";
import { normalizeNumericInput, validateBmiInputs } from "../../src/utils/validation";

describe("validation", () => {
  it("accepts valid input", () => {
    const result = validateBmiInputs("170", "65");
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.normalized).toEqual({ heightCm: 170, weightKg: 65 });
  });

  it("rejects non numeric input", () => {
    const result = validateBmiInputs("abc", "65");
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.code === "NOT_A_NUMBER")).toBe(true);
  });

  it("rejects empty input", () => {
    const result = validateBmiInputs(" ", "");
    expect(result.valid).toBe(false);
    expect(result.errors.filter((e) => e.code === "REQUIRED")).toHaveLength(2);
  });

  it("rejects out of range input", () => {
    expect(validateBmiInputs("99", "65").valid).toBe(false);
    expect(validateBmiInputs("251", "65").valid).toBe(false);
    expect(validateBmiInputs("170", "19").valid).toBe(false);
    expect(validateBmiInputs("170", "301").valid).toBe(false);
  });

  it("normalizes value by trimming", () => {
    expect(normalizeNumericInput(" 170 ")).toBe(170);
  });
});
