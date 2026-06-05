import type { InputValidationResult, ValidationError } from "../types/bmi";

const HEIGHT_MIN = 100;
const HEIGHT_MAX = 250;
const WEIGHT_MIN = 20;
const WEIGHT_MAX = 300;

const addError = (
  errors: ValidationError[],
  field: ValidationError["field"],
  code: ValidationError["code"],
  message: string
): void => {
  errors.push({ field, code, message });
};

export const normalizeNumericInput = (value: string): number => {
  return Number(value.trim());
};

export const validateBmiInputs = (
  heightInput: string,
  weightInput: string
): InputValidationResult => {
  const errors: ValidationError[] = [];

  const trimmedHeight = heightInput.trim();
  const trimmedWeight = weightInput.trim();

  if (!trimmedHeight) {
    addError(errors, "heightCm", "REQUIRED", "身長を入力してください");
  }
  if (!trimmedWeight) {
    addError(errors, "weightKg", "REQUIRED", "体重を入力してください");
  }

  const heightCm = normalizeNumericInput(trimmedHeight);
  const weightKg = normalizeNumericInput(trimmedWeight);

  if (trimmedHeight && Number.isNaN(heightCm)) {
    addError(errors, "heightCm", "NOT_A_NUMBER", "身長は数値で入力してください");
  }
  if (trimmedWeight && Number.isNaN(weightKg)) {
    addError(errors, "weightKg", "NOT_A_NUMBER", "体重は数値で入力してください");
  }

  if (!Number.isNaN(heightCm) && (heightCm < HEIGHT_MIN || heightCm > HEIGHT_MAX)) {
    addError(
      errors,
      "heightCm",
      "OUT_OF_RANGE",
      `身長は${HEIGHT_MIN}〜${HEIGHT_MAX}cmで入力してください`
    );
  }

  if (!Number.isNaN(weightKg) && (weightKg < WEIGHT_MIN || weightKg > WEIGHT_MAX)) {
    addError(
      errors,
      "weightKg",
      "OUT_OF_RANGE",
      `体重は${WEIGHT_MIN}〜${WEIGHT_MAX}kgで入力してください`
    );
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors,
    normalized: {
      heightCm,
      weightKg
    }
  };
};
