export type BmiCategory =
  | "低体重"
  | "普通体重"
  | "肥満(1度)"
  | "肥満(2度)"
  | "肥満(3度)"
  | "肥満(4度)";

export const roundToFirstDecimal = (value: number): number => {
  return Math.round(value * 10) / 10;
};

export const calculateBmi = (heightCm: number, weightKg: number): number => {
  const heightM = heightCm / 100;
  return roundToFirstDecimal(weightKg / (heightM * heightM));
};

export const calculateStandardWeight = (heightCm: number): number => {
  const heightM = heightCm / 100;
  return roundToFirstDecimal(heightM * heightM * 22);
};

export const calculateDifferenceFromStandardWeight = (
  heightCm: number,
  weightKg: number
): number => {
  const standardWeight = calculateStandardWeight(heightCm);
  return roundToFirstDecimal(weightKg - standardWeight);
};

export const getBmiCategory = (bmi: number): BmiCategory => {
  if (bmi < 18.5) return "低体重";
  if (bmi < 25) return "普通体重";
  if (bmi < 30) return "肥満(1度)";
  if (bmi < 35) return "肥満(2度)";
  if (bmi < 40) return "肥満(3度)";
  return "肥満(4度)";
};
