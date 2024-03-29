import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const monthList = [
  {
    id: 1,
    name: "Janeiro",
  },
  {
    id: 2,
    name: "Fevereiro",
  },
  {
    id: 3,
    name: "Março",
  },
  {
    id: 4,
    name: "Abril",
  },
  {
    id: 5,
    name: "Maio",
  },
  {
    id: 6,
    name: "Junho",
  },
  {
    id: 7,
    name: "Julho",
  },
  {
    id: 8,
    name: "Agosto",
  },
  {
    id: 9,
    name: "Setembro",
  },
  {
    id: 10,
    name: "Outubro",
  },
  {
    id: 11,
    name: "Novembro",
  },
  {
    id: 12,
    name: "Dezembro",
  },
];

interface MonthProps {
  id: number;
  name: string;
}

interface MonthSliceProps {
  month: MonthProps | null;
  selectMonth: (month: number) => void;
}

const useMonthSlice = create<
  MonthSliceProps,
  [["zustand/persist", MonthSliceProps]]
>(
  persist(
    (set) => ({
      month: null,
      selectMonth: (monthId: number) =>
        set({
          month: monthList.find((month) => month.id === monthId),
        }),
    }),
    {
      name: "month", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export { useMonthSlice };
