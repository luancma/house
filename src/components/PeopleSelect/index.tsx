import { IonSelect, IonSelectOption } from "@ionic/react";
import React, { useEffect } from "react";
import { supabase } from "../../services/supabase";

const PeopleSelect = ({
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
            </IonSelect>
        </div>
    );
};

export { PeopleSelect };