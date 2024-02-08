import React, { useEffect } from "react";
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  IonPage,
  IonSpinner,
  IonText,
} from "@ionic/react";
import "./Tab1.css";
import { Header } from "../components/Header";
import { add, checkmarkDoneSharp } from "ionicons/icons";
import { CreatePaymentRequest } from "../components/CreatePaymentRequest";
import { supabase } from "../services/supabase";
import { convertPriceFormat } from "../utils/convertPriceFormat";
import { convertDateFormat } from "../utils/convertDateFormat";

type PaymentProps = {
  id: number;
  payed_at: string;
  price: number;
  responsible: {
    id: number;
    name: string;
  };
  debt: {
    id: number;
    name: string;
  };
}[];

const useGetCurrentMonthPayments = () => {
  const [isFetching, setIsFetching] = React.useState(true);
  const [payments, setPayments] = React.useState<PaymentProps>([]);
  const currentMonth = new Date().getMonth();
  const fetchList = async () => {
    const { data, error } = await supabase
      .from("payments")
      .select(
        `id, price, payed_at,
        responsible ( id, name ),
        debt ( id, name )
      `
      )
      .gte("payed_at", new Date(2024, currentMonth, 1).toISOString())
      .lte("payed_at", new Date(2024, currentMonth + 1, 0).toISOString());
    if (error) {
      setPayments([]);
      setIsFetching(false);
      return;
    }
    if (data.length) {
      setPayments(data as unknown as PaymentProps);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return { payments, isFetching };
};

const Tab1: React.FC = () => {
  const [, setIsModalOpen] = React.useState(false);
  const { payments, isFetching } = useGetCurrentMonthPayments();

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen class="ion-padding">
        {isFetching ? <div className="loadingContent"><IonSpinner /></div> : (
          <>
            <IonText>
              <h1>Janeiro</h1>
            </IonText>

            <IonText>
              <h4>Gastos:</h4>
            </IonText>

            <IonList>
              {payments?.map((item) => (
                <div className="list-item" key={item.id}>
                  <div className="item-content">
                    <p className="item-title">{item.debt.name}</p>
                    <p>{item.responsible.name}</p>
                  </div>
                  <IonText className="item-price" color="success">
                    <p>{convertPriceFormat(item.price)}</p>
                  </IonText>
                  <IonText color="medium" class="item-date">
                    <p>{convertDateFormat(item.payed_at)}</p>
                  </IonText>
                  <IonIcon
                    className="item-icon"
                    icon={checkmarkDoneSharp}
                    color="success"
                  />
                </div>
              ))}
            </IonList>
            <div
              style={{
                marginTop: "80px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IonFab
                style={{
                  position: "fixed",
                  bottom: "20px",
                  right: "20px",
                }}
              >
                <IonFabButton id="open-modal" onClick={() => setIsModalOpen(true)}>
                  <IonIcon icon={add}></IonIcon>
                </IonFabButton>
              </IonFab>
            </div>
            <CreatePaymentRequest />
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
