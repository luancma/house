import React, { useEffect } from "react";
import { useMonthSlice } from "../context/monthSlice";
import { supabase } from "../services/supabase";
import { PaymentProps } from "../utils/types";
import { usePayments } from "../context/usePayments";

const useGetCurrentMonthPayments = () => {
    const month = useMonthSlice((state) => state.month);
    const [isFetching, setIsFetching] = React.useState(false);
    const setPayments = usePayments((state) => state.setPayments);

    useEffect(() => {
        setIsFetching(true);
        (async () => {
            if (!month) return;
            const { data, error } = await supabase
                .from("payments")
                .select(`id, price, payed_at, custom_debt, responsible ( id, name ), debt ( id, name ), month, deleted`)
                .eq("month", month.id)
                .eq("deleted", false);

            if (error) {
                setPayments([]);
                setIsFetching(false);
                return;
            }
            if (data.length) {
                setPayments(data as unknown as PaymentProps[]);
                setIsFetching(false);
            }
            if (!data.length) {
                setPayments([]);
                setIsFetching(false);
            }
        })();
    }, [month?.id]);

    return { isFetching };
};

export { useGetCurrentMonthPayments };