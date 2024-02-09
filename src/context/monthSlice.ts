import { create } from "zustand";

interface MonthProps {
  id: number;
  name: string;
}

const useMonthSlice = create<{
  month: MonthProps | null;
  selectMonth: (month: MonthProps) => void;
}>((set) => ({
  month: null,
  selectMonth: (month: MonthProps) => set({ month }),
}));

export { useMonthSlice };
