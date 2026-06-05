import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BmiCalculator } from "../../src/components/BmiCalculator";

describe("BmiCalculator", () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  const submit = (height: string, weight: string) => {
    fireEvent.change(screen.getByLabelText("身長(cm)"), {
      target: { value: height },
    });
    fireEvent.change(screen.getByLabelText("体重(kg)"), {
      target: { value: weight },
    });
    fireEvent.click(screen.getByRole("button", { name: "計算する" }));
  };

  it("shows calculated result with one decimal place and category", () => {
    render(<BmiCalculator />);

    submit("170", "65");

    expect(screen.getByText("BMI: 22.5")).toBeInTheDocument();
    expect(screen.getByText("判定: 普通体重")).toBeInTheDocument();
    expect(screen.getByText("標準体重: 63.6kg")).toBeInTheDocument();
    expect(screen.getByText("標準体重との差: +1.4kg")).toBeInTheDocument();
  });

  it("toggles formula visibility", () => {
    render(<BmiCalculator />);

    const button = screen.getByRole("button", { name: "計算式を表示" });

    expect(screen.queryByText("BMI = 体重(kg) ÷ (身長(m) × 身長(m))")).not.toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText("BMI = 体重(kg) ÷ (身長(m) × 身長(m))")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByText("BMI = 体重(kg) ÷ (身長(m) × 身長(m))")).not.toBeInTheDocument();
  });

  it("adds latest history item after calculation", () => {
    render(<BmiCalculator />);

    submit("170", "65");

    expect(screen.getByLabelText("計算履歴")).toBeInTheDocument();
    expect(screen.getByText(/BMI 22.5/)).toBeInTheDocument();
  });

  it("keeps history list up to 10 items", () => {
    render(<BmiCalculator />);

    for (let i = 0; i < 11; i += 1) {
      submit("170", String(60 + i));
    }

    const historySection = screen.getByLabelText("計算履歴");
    const items = historySection.querySelectorAll("ol > li");
    expect(items).toHaveLength(10);
  });

  it("continues showing result when history save fails", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota exceeded");
    });

    render(<BmiCalculator />);
    submit("170", "65");

    expect(screen.getByText("BMI: 22.5")).toBeInTheDocument();
    expect(
      screen.getByText("履歴の保存に失敗しました（計算結果は表示されています）"),
    ).toBeInTheDocument();
  });
});
