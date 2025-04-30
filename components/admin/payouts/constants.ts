export type Payout = {
  renterName: string;
  renterEmail: string;
  landlordName: string;
  landlordBankDetails: string;
  amountPaid: number;
  paymentDate: string;
  payoutStatus: "Paid" | "Pending";
  notes: string;
};

export const dummyPayouts: Payout[] = [
  {
    renterName: "John Doe",
    renterEmail: "john@email.com",
    landlordName: "Sarah Smith",
    landlordBankDetails: "Sort Code: 12-34-56, Acc No: 12345678",
    amountPaid: 1200.0,
    paymentDate: "2025-04-05",
    payoutStatus: "Paid",
    notes: "-",
  },
  {
    renterName: "Jane Roe",
    renterEmail: "jane@email.com",
    landlordName: "Mark Taylor",
    landlordBankDetails: "Sort Code: 98-76-54, Acc No: 87654321",
    amountPaid: 980.0,
    paymentDate: "2025-04-07",
    payoutStatus: "Pending",
    notes: "Waiting for verification",
  },
];
