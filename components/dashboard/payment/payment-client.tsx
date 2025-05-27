"use client";
import React, { useState } from "react";
import { OptionsIcon } from "@/assets/svg/options-icon";
import { PointsIcon } from "@/assets/svg/points-icon";
import { IconButton } from "@mui/material";
import PaymentPage from "./payment-page";
import AutopaySetup from "./autopay-setup";
import IncludePoints from "./include-points";

const PaymentClient = () => {
  const [tab, setTab] = useState<"" | "autopay-setup" | "include-points">("");
  return (
    <div className="w-full p-5 bg-[#fafafa] ">
      <div className="pb-4 border-b border-b-[#D9D9D9] w-full flex items-center justify-between ">
        <p className="text-[20px] font-[600] ">Pay Rent</p>
        <div className="flex items-center gap-4 ">
          <div>
            <div className="flex items-center">
              <PointsIcon />
              <p className="font-[700] text-[#CF931D]  ">30,256 pts</p>
            </div>
            <p className="text-[11px] text-[#999B9E] ">Member since ‘25</p>
          </div>
          <IconButton>
            <OptionsIcon />
          </IconButton>
        </div>
      </div>
      {tab === "autopay-setup" ? (
        <AutopaySetup setTab={setTab} />
      ) : tab === "include-points" ? (
        <IncludePoints setTab={setTab} />
      ) : (
        <PaymentPage setTab={setTab} />
      )}
    </div>
  );
};

export default PaymentClient;
