import React from "react"
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Month from "./pages/Month/Month";
import * as useGetCurrentMonthPaymentsModule from "./hooks/useGetCurrentMonthPayments";
import { useMonthSlice } from "./context/monthSlice";
import { usePayments } from "./context/usePayments";
import { PaymentProps } from "./utils/types";

const useGetCurrentMonthPaymentsSpy = jest.spyOn(useGetCurrentMonthPaymentsModule, 'useGetCurrentMonthPayments');

describe("Should render the Month page", () => {
  it("Should render the Month page", async () => {

    useMonthSlice.setState({
      month: {
        id: 1,
        name: "Janeiro",
      }
    })

    useGetCurrentMonthPaymentsSpy.mockReturnValue({
      isFetching: true,
    });

    render(<Month />);
    const loading = screen.getByTestId("loading-spinner")
    expect(loading).toBeInTheDocument();

    usePayments.setState({
      payments: [
        {
          id: 1,
          payed_at: "2022-01-01",
          price: 100,
          responsible: {
            id: 1,
            name: "John Doe",
          },
          debt: {
            id: 1,
            name: "Debt",
          },
          custom_debt: null,
          month: 1,
          deleted: false,
        }
      ] as PaymentProps[]
    })

    await waitFor(() => {
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    })

    screen.debug();
  });
});

