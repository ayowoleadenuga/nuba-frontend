import TopReferrersTable from "@/components/admin/dashboard/top-referrers-table";
import OverallSalesAnalytics from "./overall-sales-analytics";
import ReferralMilestones from "@/components/admin/dashboard/referral-milestones";
import UsersApproachingDiscount from "@/components/admin/dashboard/users-approaching-discount";

const AdminDashboardClient = () => {
  const allMetrics = [
    {
      name: "TOTAL USERS",
      value: 3948,
      detail: "12% from last month",
    },
    {
      name: "ACTIVE SUBSCRIPTIONS",
      value: 47376,
      detail: "Of March",
    },
    {
      name: "TOTAL REFERRALS",
      value: 3947,
      detail: "12% from last month",
    },
    {
      name: "TOTAL PROFIT",
      value: 500298.33,
      detail: "12% from last month",
    },
  ];
  return (
    <div className="w-full bg-white p-5">
      <div className="flex items-center justify-between w-[70%] bg-white">
        {allMetrics.map((metric, index) => (
          <div
            key={index}
            className=" border border-[#D9D9D9] rounded-[8px] p-3 w-fit "
          >
            <p className="text-[12px] font-[500] text-[#474747] ">
              {metric.name}{" "}
            </p>
            <p className="text-[32px] font-[500] text-[#2A4152] ">
              {metric.name === "TOTAL PROFIT" && "£"}
              {metric.value.toLocaleString()}
            </p>
            <p className="text-[8px] font-[500] text-[#27AE60] ">
              {metric.detail}
            </p>
          </div>
        ))}
      </div>
      <OverallSalesAnalytics />
      <div className="flex items-start justify-between w-[70%] mt-5 ">
        <TopReferrersTable />
        <ReferralMilestones />
      </div>
      <UsersApproachingDiscount />
    </div>
  );
};

export default AdminDashboardClient;
