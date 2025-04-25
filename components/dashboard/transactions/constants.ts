export type TransactionStatus = "Pending" | "Success" | "Failed";

export type Transaction = {
  date: string;
  status: TransactionStatus;
  cardType: "Amex" | "Mastercard";
  cardNumber: string;
  referralDiscount: string;
  amount: number;
};

export const dummyData: Transaction[] = [
  {
    date: "2025-01-01T11:19:00",
    status: "Pending",
    cardType: "Amex",
    cardNumber: "4308",
    referralDiscount: "0%",
    amount: 1200,
  },
  {
    date: "2025-01-02T11:19:00",
    status: "Success",
    cardType: "Amex",
    cardNumber: "4308",
    referralDiscount: "0%",
    amount: 1200,
  },
  {
    date: "2025-01-02T11:19:00",
    status: "Failed",
    cardType: "Mastercard",
    cardNumber: "4567",
    referralDiscount: "0%",
    amount: 1200,
  },
  {
    date: "2025-01-03T11:19:00",
    status: "Success",
    cardType: "Amex",
    cardNumber: "4308",
    referralDiscount: "0%",
    amount: 1200,
  },
  {
    date: "2025-01-04T11:19:00",
    status: "Success",
    cardType: "Amex",
    cardNumber: "4308",
    referralDiscount: "0%",
    amount: 1200,
  },
  {
    date: "2025-01-05T11:19:00",
    status: "Success",
    cardType: "Amex",
    cardNumber: "4308",
    referralDiscount: "0%",
    amount: 1200,
  },
];
