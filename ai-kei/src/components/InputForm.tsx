import { useMemo, useState } from "react";
import type { ValidationError } from "../types/bmi";
import { validateBmiInputs } from "../utils/validation";

type InputFormProps = {
  onCalculate: (heightCm: number, weightKg: number) => void;
};

export const InputForm = ({ onCalculate }: InputFormProps) => {
  const [heightInput, setHeightInput] = useState("");
  const [weightInput, setWeightInput] = useState("");
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const errorsByField = useMemo(() => {
    const map = new Map<ValidationError["field"], ValidationError>();
    for (const error of errors) {
      if (!map.has(error.field)) {
        map.set(error.field, error);
      }
    }
    return map;
  }, [errors]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const result = validateBmiInputs(heightInput, weightInput);

    if (!result.valid || !result.normalized) {
      setErrors(result.errors);
      return;
    }

    setErrors([]);
    onCalculate(result.normalized.heightCm, result.normalized.weightKg);
  };

  const heightError = errorsByField.get("heightCm");
  const weightError = errorsByField.get("weightKg");

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="heightCm">身長(cm)</label>
        <input
          id="heightCm"
          name="heightCm"
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={heightInput}
          onChange={(event) => setHeightInput(event.target.value)}
          aria-invalid={Boolean(heightError)}
          aria-describedby={heightError ? "heightCm-error" : undefined}
        />
        {heightError ? (
          <p id="heightCm-error" role="alert">
            {heightError.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="weightKg">体重(kg)</label>
        <input
          id="weightKg"
          name="weightKg"
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={weightInput}
          onChange={(event) => setWeightInput(event.target.value)}
          aria-invalid={Boolean(weightError)}
          aria-describedby={weightError ? "weightKg-error" : undefined}
        />
        {weightError ? (
          <p id="weightKg-error" role="alert">
            {weightError.message}
          </p>
        ) : null}
      </div>

      <button type="submit">計算する</button>
    </form>
  );
};
