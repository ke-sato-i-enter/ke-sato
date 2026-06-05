import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App } from "../../src/App";

const submit = (height: string, weight: string) => {
  fireEvent.change(screen.getByLabelText("身長(cm)"), {
    target: { value: height }
  });
  fireEvent.change(screen.getByLabelText("体重(kg)"), {
    target: { value: weight }
  });
  fireEvent.click(screen.getByRole("button", { name: "計算する" }));
};

describe("bmi calculator integration", () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("REQ-003/005/006: calculates and shows BMI, standard weight and diff", () => {
    render(<App />);

    submit("170", "65");

    expect(screen.getByText("BMI: 22.5")).toBeInTheDocument();
    expect(screen.getByText("判定: 普通体重")).toBeInTheDocument();
    expect(screen.getByText("標準体重: 63.6kg")).toBeInTheDocument();
    expect(screen.getByText("標準体重との差: +1.4kg")).toBeInTheDocument();
  });

  it("REQ-002/004: toggles formula and shows BMI criteria guide", () => {
    render(<App />);

    expect(screen.getByText("BMI基準")).toBeInTheDocument();
    expect(
      screen.queryByText("BMI = 体重(kg) ÷ (身長(m) × 身長(m))")
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "計算式を表示" }));

    expect(
      screen.getByText("BMI = 体重(kg) ÷ (身長(m) × 身長(m))")
    ).toBeInTheDocument();
  });

  it("REQ-007: persists history and restores it after remount", () => {
    const { unmount } = render(<App />);

    submit("170", "65");

    expect(screen.getByText(/BMI 22.5/)).toBeInTheDocument();

    unmount();
    render(<App />);

    expect(screen.getByText(/BMI 22.5/)).toBeInTheDocument();
  });

  it("REQ-001 abnormal: shows errors for non numeric and out-of-range input", () => {
    render(<App />);

    submit("abc", "65");
    expect(screen.getByText("身長は数値で入力してください")).toBeInTheDocument();

    submit("99", "19");
    expect(screen.getByText("身長は100〜250cmで入力してください")).toBeInTheDocument();
    expect(screen.getByText("体重は20〜300kgで入力してください")).toBeInTheDocument();
  });

  it("REQ-007 abnormal: continues showing result when storage save fails", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota exceeded");
    });

    render(<App />);
    submit("170", "65");

    expect(screen.getByText("BMI: 22.5")).toBeInTheDocument();
    expect(
      screen.getByText("履歴の保存に失敗しました（計算結果は表示されています）")
    ).toBeInTheDocument();
  });
});
