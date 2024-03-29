import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useRef } from "react";
import { supabase } from "../../services/supabase";
import "./styles.css";
import { PeopleSelect } from "../PeopleSelect";
import { DebtsSelect } from "../DebtsSelect";
import { useMonthSlice } from "../../context/monthSlice";


function CreatePaymentRequest() {
  const currentMonth = useMonthSlice((state) => state.month);
  const changeMonth = useMonthSlice((state) => state.selectMonth);

  const initialValue = {
    responsible: 0,
    debt: 0,
    price: 0,
    payed_at: "",
    custom_debt: null,
    month: undefined
  }
  const modal = useRef<HTMLIonModalElement>(null);
  const [paymentDebts, setPaymentDebts] = React.useState<{
    responsible: number;
    debt: number | null;
    price: number;
    payed_at: string;
    custom_debt: null | string;
    month: number | undefined;
  }>(initialValue);


  const confirm = () => {
    const paymentObj = {
      ...paymentDebts,
      payed_at: new Date().toISOString(),
      debt: paymentDebts.custom_debt ? null : paymentDebts.debt,
    };
    if (paymentObj.price > 0) {
      supabase.from("payments").insert([paymentObj]).then(() => {
        setPaymentDebts(initialValue)
        changeMonth(paymentObj.month || currentMonth?.id || new Date().getMonth());
        modal.current?.dismiss();
      })
    } else {
      alert("O valor do pagamento deve ser maior que 0");
    }
  }

  function onWillDismiss() {
    setPaymentDebts(initialValue);
    modal.current?.dismiss();
  }

  const handlePaymentDebts = (key: string, value: number | string) => {
    setPaymentDebts(() => ({
      ...paymentDebts,
      [key]: value,
    }));
  }

  const months = [
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

  return (
    <IonModal
      ref={modal}
      trigger="open-modal"
      onWillDismiss={onWillDismiss}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registrar Pagamento</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="solid" color={"danger"} strong={true} onClick={() => modal.current?.dismiss()}>
              Fechar
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="list-container ion-padding">
        <PeopleSelect setPerson={handlePaymentDebts} />
        <DebtsSelect setDebit={handlePaymentDebts} />

        <div className="item-wrapper">
          <IonSelect
            aria-label="mes"
            label="Mês"
            labelPlacement="floating"
            fill="outline"
            interface="popover"
            value={paymentDebts.month}
            onIonChange={(e) => handlePaymentDebts("month", e.detail.value)}
          >
            {months.map((month) => (
              <IonSelectOption key={month.id} value={month.id}>
                {month.name}
              </IonSelectOption>
            ))}
          </IonSelect>
        </div>

        <div className="item-wrapper">
          <IonInput
            className="item-wrapper"
            label="Valor do pagamento"
            labelPlacement="floating"
            placeholder="Valor"
            fill="outline"
            type="number"
            onIonInput={(e) =>
              handlePaymentDebts("price", Number(e.detail.value))
            }
          />
        </div>
        <div>
          <IonButton expand="block" onClick={() => confirm()}>
            Registrar
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
}

export { CreatePaymentRequest };
