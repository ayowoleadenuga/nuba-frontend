export type User = {
  fullName: string;
  email: string;
  phone: string;
  joinedOn: string;
  rentPaid: number;
  paymentDate: string;
  referralCount: number;
  discountEarned: number;
  status: string;
};

export const dummyUsers: User[] = [
  {
    fullName: "John Doe",
    email: "john@email.com",
    phone: "Sarah Smith",
    joinedOn: "2024-04-05",
    rentPaid: 1200,
    paymentDate: "2025-04-05",
    referralCount: 608,
    discountEarned: 1234,
    status: "Active",
  },
  {
    fullName: "John Doe",
    email: "john@email.com",
    phone: "Sarah Smith",
    joinedOn: "2024-04-05",
    rentPaid: 1200,
    paymentDate: "2025-04-05",
    referralCount: 608,
    discountEarned: 1234,
    status: "Active",
  },
  {
    fullName: "John Doe",
    email: "john@email.com",
    phone: "Sarah Smith",
    joinedOn: "2024-04-05",
    rentPaid: 1200,
    paymentDate: "2025-04-05",
    referralCount: 608,
    discountEarned: 1234,
    status: "Active",
  },
];
