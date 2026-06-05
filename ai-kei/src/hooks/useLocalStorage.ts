import { useRef, useState } from "react";
import type { BmiHistoryRecord } from "../types/bmi";

export const BMI_HISTORY_STORAGE_KEY = "bmi-calculator:history";
export const MAX_BMI_HISTORY = 10;

const parseHistory = (value: string | null): BmiHistoryRecord[] => {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? (parsed as BmiHistoryRecord[]) : [];
  } catch {
    return [];
  }
};

export const readBmiHistory = (): BmiHistoryRecord[] => {
  try {
    return parseHistory(localStorage.getItem(BMI_HISTORY_STORAGE_KEY));
  } catch {
    return [];
  }
};

export const writeBmiHistory = (history: BmiHistoryRecord[]): boolean => {
  try {
    localStorage.setItem(BMI_HISTORY_STORAGE_KEY, JSON.stringify(history));
    return true;
  } catch {
    return false;
  }
};

const limitHistory = (history: BmiHistoryRecord[]): BmiHistoryRecord[] => {
  return history.slice(0, MAX_BMI_HISTORY);
};

export const useBmiHistory = () => {
  const [history, setHistory] = useState<BmiHistoryRecord[]>(() => readBmiHistory());
  const historyRef = useRef<BmiHistoryRecord[]>(history);

  const addHistory = (record: BmiHistoryRecord): boolean => {
    const next = limitHistory([record, ...historyRef.current]);
    const saved = writeBmiHistory(next);
    historyRef.current = next;
    setHistory(next);

    return saved;
  };

  const clearHistory = (): void => {
    historyRef.current = [];
    setHistory([]);
    writeBmiHistory([]);
  };

  return {
    history,
    addHistory,
    clearHistory,
  };
};
