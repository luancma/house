import React from 'react';
import { IonAlert } from '@ionic/react';
import { supabase } from '../../services/supabase';
import { PaymentProps } from '../../utils/types';

export function RemoveCardAlert({
  isOpen,
  setOpenRemoveCardAlert,
  selectedItem
}: {
  isOpen: boolean;
  setOpenRemoveCardAlert: () => void;
  selectedItem: PaymentProps
}) {

  const handleDeleteItem = async () => {
    const { error } = await supabase
      .from('payments')
      .update({ "deleted": true })
      .eq('id', selectedItem.id)

    if (error) {
      alert(error?.message)
    }
    setOpenRemoveCardAlert()
  }

  return (
    <>
      <IonAlert
        isOpen={isOpen}
        header="Alert!"
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              setOpenRemoveCardAlert()
            },
          },
          {
            text: 'OK',
            role: 'confirm',
            handler: handleDeleteItem,
          },
        ]}
        onDidDismiss={() =>
          setOpenRemoveCardAlert()
        }
      ></IonAlert>
    </>
  );
}
