import UserApproachingDiscountTable from "@/components/admin/dashboard/users-approaching-discount-table";
import React from "react";

const UsersApproachingDiscount = () => {
  return (
    <div className="w-[70%] border rounded-[8px] border-[#D9D9D9] mt-5 h-[345px]  bg-[#f7f9fc] p-3  ">
      <p className="text-grayText font-[500] text-[12px] ">
        Users Approaching Discount Milestones
      </p>
      <UserApproachingDiscountTable />
    </div>
  );
};

export default UsersApproachingDiscount;
