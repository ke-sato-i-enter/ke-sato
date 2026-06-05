import { useState } from "react";
import { useBmiHistory } from "../hooks/useLocalStorage";
import {
  calculateBmi,
  calculateDifferenceFromStandardWeight,
  calculateStandardWeight,
  getBmiCategory,
} from "../utils/bmiCalculations";
import { BmiHistory } from "./BmiHistory";
import { BmiInfo } from "./BmiInfo";
import { BmiResult } from "./BmiResult";
import { InputForm } from "./InputForm";

type CalculationResult = {
  bmi: number;
  standardWeightKg: number;
  diffKg: number;
  category: ReturnType<typeof getBmiCategory>;
};

export const BmiCalculator = () => {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showFormula, setShowFormula] = useState(false);
  const [saveWarning, setSaveWarning] = useState<string | null>(null);
  const { history, addHistory } = useBmiHistory();

  const handleCalculate = (heightCm: number, weightKg: number) => {
    const bmi = calculateBmi(heightCm, weightKg);
    const standardWeightKg = calculateStandardWeight(heightCm);
    const diffKg = calculateDifferenceFromStandardWeight(heightCm, weightKg);
    const category = getBmiCategory(bmi);

    setResult({
      bmi,
      standardWeightKg,
      diffKg,
      category,
    });

    const saved = addHistory({
      heightCm,
      weightKg,
      bmi,
      standardWeightKg,
      diffKg,
      calculatedAt: new Date().toISOString(),
    });

    setSaveWarning(saved ? null : "履歴の保存に失敗しました（計算結果は表示されています）");
  };

  return (
    <section>
      <InputForm onCalculate={handleCalculate} />

      <button type="button" onClick={() => setShowFormula((prev) => !prev)}>
        計算式を表示
      </button>

      {showFormula ? <p>BMI = 体重(kg) ÷ (身長(m) × 身長(m))</p> : null}

      {result ? (
        <BmiResult
          bmi={result.bmi}
          standardWeightKg={result.standardWeightKg}
          diffKg={result.diffKg}
          category={result.category}
        />
      ) : (
        <p>計算結果はまだありません</p>
      )}

      {saveWarning ? <p role="alert">{saveWarning}</p> : null}

      <BmiHistory history={history} />

      <BmiInfo />
    </section>
  );
};
