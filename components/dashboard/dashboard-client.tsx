import React from "react";
import { OptionsIcon } from "@/assets/svg/options-icon";
import { PointIcon } from "@/assets/svg/point-icon";
import { IconButton } from "@mui/material";
import DashboardPage from "@/components/dashboard/dashboard-page";

const DashboardClient = () => {
  return (
    <div className="w-full p-5">
      <div className="pb-4 border-b border-b-[#D9D9D9] w-full flex items-center justify-between ">
        <p className="text-[20px] font-[600] ">Dashboard</p>
        <div className="flex items-center gap-4 ">
          <div>
            <div className="flex items-center">
              <PointIcon />
              <p className="font-[700] text-[#CF931D]  ">30,256 pts</p>
            </div>
            <p className="text-[11px] text-[#999B9E] ">Member since ‘25</p>
          </div>
          <IconButton>
            <OptionsIcon />
          </IconButton>
        </div>
      </div>
      <DashboardPage />
    </div>
  );
};

export default DashboardClient;
