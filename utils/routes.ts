export const routes = {
  auth: {
    login: "/login",
    signup: "/sign-up",
  },
  user: {
    dashboard: "/dashboard",
    payment: "/payment",
    referrals: "/referrals",
    settings: "/settings",
    supportCenter: "/support",
    transactions: "/transactions",
  },
  admin: {
    dashboard: "/admin/dashboard",
    payouts: "/admin/payouts",
    referrals: "/admin/referrals",
    settings: "/admin/settings",
    users: "/admin/users",
  },
} as const;
