import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { BmiHistoryRecord } from "../../src/types/bmi";
import {
  BMI_HISTORY_STORAGE_KEY,
  MAX_BMI_HISTORY,
  useBmiHistory
} from "../../src/hooks/useLocalStorage";

const createRecord = (index: number): BmiHistoryRecord => ({
  heightCm: 170,
  weightKg: 65 + index,
  bmi: 22.5 + index,
  standardWeightKg: 63.6,
  diffKg: 1.4 + index,
  calculatedAt: `2026-06-05T00:00:${String(index).padStart(2, "0")}Z`
});

describe("useBmiHistory", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("saves and reads history", () => {
    const { result, unmount } = renderHook(() => useBmiHistory());

    act(() => {
      result.current.addHistory(createRecord(1));
    });

    expect(result.current.history).toHaveLength(1);
    expect(JSON.parse(localStorage.getItem(BMI_HISTORY_STORAGE_KEY) ?? "[]")).toHaveLength(
      1
    );

    unmount();

    const { result: next } = renderHook(() => useBmiHistory());
    expect(next.current.history).toHaveLength(1);
  });

  it("keeps only latest 10 records", () => {
    const { result } = renderHook(() => useBmiHistory());

    act(() => {
      for (let i = 0; i < MAX_BMI_HISTORY + 1; i += 1) {
        result.current.addHistory(createRecord(i));
      }
    });

    expect(result.current.history).toHaveLength(MAX_BMI_HISTORY);
    expect(result.current.history[0]?.weightKg).toBe(75);
    expect(result.current.history[MAX_BMI_HISTORY - 1]?.weightKg).toBe(66);
  });

  it("continues even when localStorage set fails", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota exceeded");
    });

    const { result } = renderHook(() => useBmiHistory());

    expect(() => {
      act(() => {
        result.current.addHistory(createRecord(1));
      });
    }).not.toThrow();

    expect(result.current.history).toHaveLength(1);
  });
});
