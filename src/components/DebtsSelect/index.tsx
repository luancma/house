
import React, { useEffect } from "react";
import { IonInput, IonSelect, IonSelectOption, IonToggle } from "@ionic/react";
import { supabase } from "../../services/supabase";

const DebtsSelect = ({
    setDebit,
}: {
    setDebit: (key: string, value: number | string) => void;
}) => {
    const [otherPayment, setOtherPayment] = React.useState(false);
    const [debts, setDebts] = React.useState<
        {
            created_at: string;
            id: number;
            name: string;
            values_history: unknown;
        }[]
    >([]);
    const fetchDebts = async () => {
        const { data, error } = await supabase.from("debt").select("*");
        if (error) {
            return;
        }
        setDebts(data);
    };
    useEffect(() => {
        fetchDebts();
    }, []);
    return (
        <div className="item-wrapper">
            {otherPayment ? (
                <IonInput
                    label="Nome do pagamento"
                    labelPlacement="floating"
                    placeholder="Nome do pagamento"
                    fill="outline"
                    type="text"
                    onIonChange={(e) => setDebit("custom_debt", e.detail.value as string)}
                />
            ) : (
                <IonSelect
                    mode="md"
                    aria-label="fatura"
                    label="Fatura"
                    labelPlacement="floating"
                    fill="outline"
                    interface="popover"
                    onIonChange={(e) => setDebit("debt", e.detail.value)}
                >
                    {debts.map((debt) => (
                        <IonSelectOption key={debt.id} value={debt.id}>
                            {debt.name}
                        </IonSelectOption>
                    ))}
                </IonSelect>
            )}
            <IonToggle
                mode="ios"
                className="toggle" checked={otherPayment} onIonChange={() => setOtherPayment((prev) => !prev)}>
                Outro pagamento
            </IonToggle>
        </div>
    );
};

export {
    DebtsSelect
}