import { PaymentProps } from "./../utils/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UsePaymentProps {
  payments: PaymentProps[];
  setPayments: (payments: PaymentProps[]) => void;
  insertPayment: (payment: PaymentProps) => void;
  removePayment: (payment: PaymentProps) => void;
  updatePayment: (payment: PaymentProps) => void;
}

export const usePayments = create<
  UsePaymentProps,
  [["zustand/persist", UsePaymentProps]]
>(
  persist(
    (set) => ({
      payments: [],
      insertPayment: (payment: PaymentProps) =>
        set((state) => ({
          payments: [...state.payments, payment],
        })),
      setPayments: (payments: PaymentProps[]) =>
        set({
          payments,
        }),
      removePayment: (payment: PaymentProps) =>
        set((state) => ({
          payments: state.payments.filter((item) => item.id !== payment.id),
        })),
      updatePayment: (payment: PaymentProps) =>
        set((state) => ({
          payments: state.payments.map((item) => {
            if (item.id === payment.id) {
              return payment;
            }
            return item;
          }),
        })),
    }),
    {
      name: "payments", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
