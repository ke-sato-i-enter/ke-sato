export type BmiField = "heightCm" | "weightKg";

export type ValidationErrorCode = "REQUIRED" | "NOT_A_NUMBER" | "OUT_OF_RANGE";

export interface ValidationError {
  field: BmiField;
  code: ValidationErrorCode;
  message: string;
}

export interface InputValidationResult {
  valid: boolean;
  errors: ValidationError[];
  normalized?: {
    heightCm: number;
    weightKg: number;
  };
}

export interface BmiHistoryRecord {
  heightCm: number;
  weightKg: number;
  bmi: number;
  standardWeightKg: number;
  diffKg: number;
  calculatedAt: string;
}
