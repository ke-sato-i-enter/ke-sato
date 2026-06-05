import type { BmiCategory } from "../utils/bmiCalculations";

type BmiResultProps = {
  bmi: number;
  standardWeightKg: number;
  diffKg: number;
  category: BmiCategory;
};

export const BmiResult = ({ bmi, standardWeightKg, diffKg, category }: BmiResultProps) => {
  const signedDiff = diffKg > 0 ? `+${diffKg.toFixed(1)}` : diffKg.toFixed(1);

  return (
    <section aria-label="計算結果">
      <h2>計算結果</h2>
      <p>BMI: {bmi.toFixed(1)}</p>
      <p>判定: {category}</p>
      <p>標準体重: {standardWeightKg.toFixed(1)}kg</p>
      <p>標準体重との差: {signedDiff}kg</p>
    </section>
  );
};
