export type PaymentProps = {
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
  custom_debt: string | null;
}[];
