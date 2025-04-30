export type User = {
  fullName: string;
  email: string;
  referralCount: number;
  milestone: number;
  joined: number;
  status: "Active" | "Inactive" | "Pending";
};

export const dummyUsers: User[] = [
  {
    fullName: "Emily Carter",
    email: "emily@email.com",
    referralCount: 1000,
    milestone: 60,
    joined: 1200.0,
    status: "Active",
  },
  {
    fullName: "Emily James",
    email: "emily@email.com",
    referralCount: 1000,
    milestone: 60,
    joined: 1200.0,
    status: "Active",
  },
];
