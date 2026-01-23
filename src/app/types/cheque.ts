export interface BankTemplate {
  id: string;
  name: string;
  logo: string;
  color: string;
  dimensions: {
    width: number;
    height: number;
  };
  fields: {
    date: FieldPosition;
    payee: FieldPosition;
    amountWords: FieldPosition;
    amountNumber: FieldPosition;
    accountNumber: FieldPosition;
    signature: FieldPosition;
  };
}

export interface FieldPosition {
  x: number;
  y: number;
  fontSize: number;
}

export interface ChequeData {
  payee: string;
  amount: number;
  date: string;
  accountNumber: string;
  bankTemplateId: string;
  memo?: string;
}
