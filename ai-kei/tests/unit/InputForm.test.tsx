import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { InputForm } from "../../src/components/InputForm";

describe("InputForm", () => {
  it("renders labeled input fields", () => {
    render(<InputForm onCalculate={vi.fn()} />);

    expect(screen.getByLabelText("身長(cm)")).toBeInTheDocument();
    expect(screen.getByLabelText("体重(kg)")).toBeInTheDocument();
  });

  it("calls onCalculate with valid numeric inputs", () => {
    const onCalculate = vi.fn();
    render(<InputForm onCalculate={onCalculate} />);

    fireEvent.change(screen.getByLabelText("身長(cm)"), {
      target: { value: "170" }
    });
    fireEvent.change(screen.getByLabelText("体重(kg)"), {
      target: { value: "65" }
    });
    fireEvent.click(screen.getByRole("button", { name: "計算する" }));

    expect(onCalculate).toHaveBeenCalledTimes(1);
    expect(onCalculate).toHaveBeenCalledWith(170, 65);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("shows Japanese validation error for non numeric input", () => {
    const onCalculate = vi.fn();
    render(<InputForm onCalculate={onCalculate} />);

    fireEvent.change(screen.getByLabelText("身長(cm)"), {
      target: { value: "abc" }
    });
    fireEvent.change(screen.getByLabelText("体重(kg)"), {
      target: { value: "65" }
    });
    fireEvent.click(screen.getByRole("button", { name: "計算する" }));

    expect(onCalculate).not.toHaveBeenCalled();
    expect(screen.getByText("身長は数値で入力してください")).toBeInTheDocument();
  });
});
