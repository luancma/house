import React, { useEffect } from "react";
import { useMonthSlice } from "../context/monthSlice";
import { supabase } from "../services/supabase";
import { PaymentProps } from "../utils/types";

const useGetCurrentMonthPayments = () => {
    const month = useMonthSlice((state) => state.month);
    const [isFetching, setIsFetching] = React.useState(false);
    const [payments, setPayments] = React.useState<PaymentProps>([]);
    const fetchList = async () => {
        if (!month) return;
        const { data, error } = await supabase
            .from("payments")
            .select(`id, price, payed_at, custom_debt, responsible ( id, name ), debt ( id, name )`)
            .eq("month", month.id);

        if (error) {
            setPayments([]);
            setIsFetching(false);
            return;
        }
        if (data.length) {
            setPayments(data as unknown as PaymentProps);
            setIsFetching(false);
        }

        if (!data.length) {
            setPayments([]);
            setIsFetching(false);
        }
    };

    useEffect(() => {
        setIsFetching(true);
        fetchList();
    }, [month]);

    return { payments, isFetching };
};

export { useGetCurrentMonthPayments };