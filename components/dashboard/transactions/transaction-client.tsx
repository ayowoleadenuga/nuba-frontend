import React from "react";
import { OptionsIcon } from "@/assets/svg/options-icon";
import { PointIcon } from "@/assets/svg/point-icon";
import TransactionTable from "./transaction-table";
import { IconButton } from "@mui/material";
import ammexCard from "@/assets/svg/amex-card.svg";
import Image from "next/image";

const TransactionClient = () => {
  return (
    <div className="w-full p-5">
      <div className="pb-4 border-b border-b-[#D9D9D9] w-full flex items-center justify-between ">
        <p className="text-[20px] font-[600] ">Transactions</p>
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
      <div className="bg-white">
        <p className="font-[600] text-[12px] mt-7 ">Recent Transactions</p>
        <div className="bg-[#FAFAFA] p-4 rounded-[4px] w-full md:w-[50%] ">
          <div className="flex items-center justify-between">
            <p className="text-[12px] text-grayText ">Your Rent</p>
            <p className="text-[12px] text-grayText ">£1,200.00</p>
          </div>
          <div className="flex items-center justify-between mt-5">
            <p className="text-[12px] text-grayText ">Total Rent Paid</p>
            <p className="text-[12px] text-grayText ">£1,200.00</p>
          </div>
          <div className="flex items-center justify-between mt-5">
            <p className="text-[12px] text-grayText ">Discount Deductions</p>
            <p className="text-[12px] text-grayText ">£0</p>
          </div>
          <p className="text-[12px] text-grayText mt-5 ">
            Earn 167 more points to reach the 30% milestone
          </p>
        </div>

        <TransactionTable />
        <div className="md:hidden block border border-border px-2 py-3 mt-4 ">
          <div className="flex items-center justify-between w-full">
            <div className="w-[48%] ">
              <p className="uppercase text-[12px] font-[500] ">Rent Payment</p>
              <p className=" text-[10px] font-[500] ">01/01/2025 11:19 AM</p>
            </div>
            <div className="w-[48%] ">
              <p className="uppercase text-[12px] font-[500] text-end ">
                {" "}
                -£1,200.00
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image src={ammexCard} alt="ammex" />
                  <p className=" text-[8px] font-[500] ">Amex Card</p>
                </div>

                <p className=" text-[8px] font-[500] ">..4308</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionClient;
