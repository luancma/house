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
import React, { useEffect, useRef } from "react";
import { supabase } from "../../services/supabase";
import "./styles.css";

const DebtList = ({
  setDebit,
}: {
  setDebit: (key: string, value: number) => void;
}) => {
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
      <IonSelect
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
    </div>
  );
};

const PersonList = ({
  setPerson,
}: {
  setPerson: (key: string, value: number) => void;
}) => {
  const [people, setPeople] = React.useState<
    {
      created_at: string;
      id: number;
      name: string;
    }[]
  >([]);
  const fetchPeople = async () => {
    const { data, error } = await supabase.from("responsible").select("*");
    if (error) {
      return;
    }
    setPeople(data);
  };
  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div className="item-wrapper">
      <IonSelect
        className="select-wrapper"
        aria-label="fatura"
        label="Responsável"
        labelPlacement="floating"
        fill="outline"
        interface="popover"
        onIonChange={(e) => setPerson("responsible", e.detail.value)}
      >
        {people.map((person) => (
          <IonSelectOption key={person.id} value={person.id}>
            {person.name}
          </IonSelectOption>
        ))}
        {/* <IonSelectOption value="apple">Laurilio</IonSelectOption> */}
        {/* <IonSelectOption value="banana">Ana Maria</IonSelectOption> */}
      </IonSelect>
    </div>
  );
};

function CreatePaymentRequest() {
  const [paymentDebts, setPaymentDebts] = React.useState<{
    responsible: number;
    debt: number;
    price: number;
    payed_at: string;
  }>({
    responsible: 0,
    debt: 0,
    price: 0,
    payed_at: "",
  });

  const modal = useRef<HTMLIonModalElement>(null);
  function confirm() {
    setPaymentDebts((prevState) => ({
      ...prevState,
      payed_at: new Date().toISOString(),
    }));
    supabase.from("payments").insert([paymentDebts])
  }

  function onWillDismiss() {
    modal.current?.dismiss();
  }

  function handlePaymentDebts(key: string, value: number) {
    setPaymentDebts((prevState) => ({
      ...prevState,
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
        <PersonList setPerson={handlePaymentDebts} />
        <DebtList setDebit={handlePaymentDebts} />

        <div className="item-wrapper">
          <IonSelect
            aria-label="mes"
            label="Mês"
            labelPlacement="floating"
            fill="outline"
            interface="popover"
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
            onIonChange={(e) =>
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
