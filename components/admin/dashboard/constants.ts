export type DiscountStatus = "Activated" | "Not Activated";

export interface DiscountUser {
  user: string;
  milestone: string;
  status: DiscountStatus;
  rentAmount: number;
  afterDiscount: number;
}

export const dummyDiscountUsers: DiscountUser[] = [
  {
    user: "John Smith",
    milestone: "30% Discount",
    status: "Not Activated",
    rentAmount: 890,
    afterDiscount: 623,
  },
  {
    user: "Allen Ulrea",
    milestone: "60% Discount",
    status: "Activated",
    rentAmount: 1900,
    afterDiscount: 267,
  },
];
