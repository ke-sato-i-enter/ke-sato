import type { BmiHistoryRecord } from "../types/bmi";

type BmiHistoryProps = {
  history: BmiHistoryRecord[];
};

export const BmiHistory = ({ history }: BmiHistoryProps) => {
  return (
    <section aria-label="計算履歴">
      <h2>計算履歴</h2>
      {history.length === 0 ? (
        <p>履歴はまだありません</p>
      ) : (
        <ol>
          {history.map((item) => (
            <li key={item.calculatedAt}>
              <span>{item.calculatedAt}</span>
              <span> / BMI {item.bmi.toFixed(1)}</span>
              <span> / 身長 {item.heightCm}cm</span>
              <span> / 体重 {item.weightKg}kg</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
};
