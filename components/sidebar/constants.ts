import { DashboardIcon } from "@/assets/svg/dashboard-icon";
import PaymentIcon from "@/assets/svg/payment-icon";
import { ReferralsIcon } from "@/assets/svg/referrals-icon";
import { SettingsIcon } from "@/assets/svg/settings-icon";
import SupportIcon from "@/assets/svg/support-icon";
import { TransactionsIcon } from "@/assets/svg/transactions-icon";

export const sideListItems = [
  {
    label: "Dashboard",
    route: "/dashboard",
    Icon: DashboardIcon,
  },
  {
    label: "Payment",
    route: "/payment",
    Icon: PaymentIcon,
  },
  {
    label: "Referrals",
    route: "/referrals",
    Icon: ReferralsIcon,
  },
  {
    label: "Transactions",
    route: "/transactions",
    Icon: TransactionsIcon,
  },
];

export const supportList = [
  {
    label: "Settings",
    route: "/settings",
    Icon: SettingsIcon,
  },
  {
    label: "Support center",
    route: "/support",
    Icon: SupportIcon,
  },
];
