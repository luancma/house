import React, { useEffect } from "react";
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonText,
} from "@ionic/react";
import "./month.css";
import { Header } from "../../components/Header";
import { add, checkmarkDoneSharp } from "ionicons/icons";
import { convertPriceFormat } from "../../utils/convertPriceFormat";
import { convertDateFormat } from "../../utils/convertDateFormat";
import { useMonthSlice } from "../../context/monthSlice";
import { CreatePaymentRequest } from "../../components/CreatePaymentRequest";
import { useGetCurrentMonthPayments } from "../../hooks/useGetCurrentMonthPayments";
const Month: React.FC = () => {
  const month = useMonthSlice((state) => state.month);
  const selectedMonth = useMonthSlice((state) => state.selectMonth);
  const [, setIsModalOpen] = React.useState(false);
  const { payments, isFetching } = useGetCurrentMonthPayments();
  const monthList = [
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

  useEffect(() => {
    selectedMonth(monthList[new Date().getMonth()]);
  }, [])

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen class="ion-padding">
        <>
          <IonSelect
            value={month?.id}
            aria-label="select-month"
            interface="action-sheet"
            placeholder="Mês"
            cancelText="Fechar"
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
            onIonChange={(e) => {
              const month = monthList.find((item) => item.id === e.detail.value);
              if (month) {
                selectedMonth(month);
              }
            }}>
            {monthList.map((month) => (
              <IonSelectOption
                key={month.id} value={month.id} >
                {month.name}
              </IonSelectOption>
            ))}
          </IonSelect>
          {isFetching ? (
            <div className="loadingContent">
              <IonSpinner />
            </div>
          ) : (
            <>
              {payments.length ? (
                <>
                  <IonText>
                    <h4>Gastos:</h4>
                  </IonText>
                  <IonList>
                    {payments?.map((item) => (
                      <div className="list-item" key={item.id}>
                        <div className="item-content">
                          <p className="item-title">{item?.debt?.name || item.custom_debt}</p>
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
                          color="success" />
                      </div>
                    ))}
                  </IonList>
                </>
              ) : (
                <IonText>
                  <p>Nenhum pagamento registrado no mês selecionado</p>
                </IonText>
              )}
            </>
          )}
        </>
      </IonContent>
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
    </IonPage>
  );
};

export default Month;
