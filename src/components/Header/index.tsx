import React from "react";
import {
  IonButton,
  IonGrid,
  IonHeader,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { supabase } from "../../services/supabase";

function Header() {
  return (
    <IonHeader>
      <IonToolbar>
        <IonGrid>
          <IonRow class="ion-align-items-center">
            <IonTitle>Pagamentos do mês</IonTitle>
            <div className="ion-justify-content-end">
              <IonButton  fill="solid" onClick={() => supabase.auth.signOut()} color="danger">
                Sair
              </IonButton>
            </div>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonHeader>
  );
}

export { Header };
