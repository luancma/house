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
import { add, checkmarkDoneSharp, trashBinSharp } from "ionicons/icons";
import { convertPriceFormat } from "../../utils/convertPriceFormat";
import { convertDateFormat } from "../../utils/convertDateFormat";
import { monthList, useMonthSlice } from "../../context/monthSlice";
import { CreatePaymentRequest } from "../../components/CreatePaymentRequest";
import { useGetCurrentMonthPayments } from "../../hooks/useGetCurrentMonthPayments";
import { RemoveCardAlert } from "../../components/RemoveCardAlert";
import { usePayments } from "../../context/usePayments";
import { supabase } from "../../services/supabase";
import { PaymentProps } from "../../utils/types";

const Month = () => {
  const [openRemoveCardAlert, setOpenRemoveCardAlert] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<PaymentProps | null>(null);
  const month = useMonthSlice((state) => state.month);
  const selectMonth = useMonthSlice((state) => state.selectMonth);
  const [, setIsModalOpen] = React.useState(false);
  const { isFetching } = useGetCurrentMonthPayments();
  const payments = usePayments((state) => state.payments);
  const insertPayment = usePayments((state) => state.insertPayment);
  const removePayment = usePayments((state) => state.removePayment);
  const updatePayment = usePayments((state) => state.updatePayment);

  useEffect(() => {
    selectMonth(new Date().getMonth());
  }, [])


  useEffect(() => {
    const roomSubscription = supabase
      .channel('any')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'payments', filter: `month=eq.${month?.id}` }, payload => {
        if (payload.eventType === 'INSERT') {
          const getDetails = async () => {
            const { data, error } = await supabase
              .from("payments")
              .select(`id, price, payed_at, custom_debt, responsible ( id, name ), debt ( id, name ), month, deleted`)
              .eq("month", month?.id)
              .eq("id", payload.new.id)
              .eq("deleted", false);

            if (data?.length) {
              insertPayment(data[0] as unknown as PaymentProps);
            }
            if (error) {
              return;
            }
          }
          getDetails();
        }
        if (payload.eventType === 'DELETE') {
          removePayment(payload.old as PaymentProps);
        }
        if (payload.eventType === 'UPDATE') {
          if (payload.new.deleted) {
            removePayment(payload.new as PaymentProps);
          }
          if (!payload.new.deleted) {
            const getDetails = async () => {
              const { data, error } = await supabase
                .from("payments")
                .select(`id, price, payed_at, custom_debt, responsible ( id, name ), debt ( id, name ), month, deleted`)
                .eq("month", month?.id)
                .eq("id", payload.new.id)
                .eq("deleted", false);
              if (error) {
                return;
              }
              if (data?.length) {
                updatePayment(data[0] as unknown as PaymentProps);
              }
            }
            getDetails();
          }
        }
      })
      .subscribe()

    return () => {
      roomSubscription.unsubscribe();
    };
  }, [month]);

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
                selectMonth(month.id);
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
            <div className="loadingContent" data-testid="loading-spinner">
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
                    {payments?.map((item: PaymentProps) => (
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
                          id="open-delete-card-alert"
                          onClick={() => {
                            setSelectedItem(item);
                            setOpenRemoveCardAlert(true);
                          }}
                          className="item-icon item-icon-remove"
                          icon={trashBinSharp}
                          color="danger" />
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
        {openRemoveCardAlert ? (
          <RemoveCardAlert
            selectedItem={selectedItem as PaymentProps}
            isOpen={openRemoveCardAlert}
            setOpenRemoveCardAlert={() => {
              setOpenRemoveCardAlert(false)
              setSelectedItem(null)
            }} />
        ) : null
        }
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
    </IonPage >
  );
};

export default Month;
