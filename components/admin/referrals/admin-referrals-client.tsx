import { Button } from "@/components/ui/button";
import React from "react";
import { ExportIcon } from "@/assets/svg/export-icon";
import { ArrowDownIcon } from "@/assets/svg/arrow-dropdown-icon";
import ReferralsTable from "./referrals-table";

const AdminReferralsClient = () => {
  return (
    <div className="w-full bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="w-[50%] ">
          <div className="w-full flex items-center justify-between  gap-2">
            <input
              className="w-[80%] h-[44px] px-4 border border-border rounded-[10px] outline-none text-[14px] "
              placeholder="Search name or email"
            />
            <Button className="w-[20%] ">Search</Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative min-w-20 px-4 h-[30px] bg-[#ececec] rounded-[4px] flex items-center text-[10px] font-[500] ">
            <p className="text-[10px] ">All</p>
            <button className="absolute top-1 right-2">
              <ArrowDownIcon />
            </button>
          </div>
          <button className="min-w-[109px] h-[30px] bg-[#ececec] rounded-[4px] flex items-center justify-center gap-1 text-[10px] font-[500] ">
            Export CSV
            <ExportIcon />
          </button>
        </div>
      </div>
      <ReferralsTable />
    </div>
  );
};

export default AdminReferralsClient;
