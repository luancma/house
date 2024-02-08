import React from "react";
import {
  IonButton,
  IonContent,
  IonPage,
  IonText,
} from "@ionic/react";
import { supabase } from "../../services/supabase";

const LoginPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonText>
          <h1>Entrar</h1>
          <IonButton
            onClick={() =>
              supabase.auth.signInWithPassword({
                email: "user1@email.com",
                password: "123123",
              })
            }
          >
            Entrar com Email
          </IonButton>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
