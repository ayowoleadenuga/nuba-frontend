"use client";
import ReferralMilestonesChart from "@/components/admin/dashboard/referral-milestones-chart";
import NubaInput from "@/components/ui/nuba-input";
import React, { useState } from "react";

const ReferralMilestones = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  return (
    <div className="w-[55%] border rounded-[8px] border-[#D9D9D9]  bg-[#f7f9fc] p-3 h-[345px]  ">
      <p className="text-grayText font-[500] text-[12px] ">
        Referral Milestones
      </p>
      <div className="flex justify-end w-full">
        <div className="border rounded-[4px] h-[30px] flex items-center  gap-2 px-2 ">
          <NubaInput
            containerClass={"w-[100px] space-y-0  "}
            inputClass=" rounded-[8px] bg-transparent border-0 cursor-pointer h-[30px] text-[12px] p-0 "
            dropdownButtonStyle="top-2 right-0"
            label=""
            placeholder="Start date"
            readOnly
            dropdownIcon
            setSelectedDate={setStartDate}
            name="startDate"
            value={startDate ? startDate.toLocaleDateString() : ""}
          />
          <p className="font-[500] text-[14px] ">-</p>
          <NubaInput
            containerClass={"w-[100px] space-y-0  "}
            inputClass=" rounded-[8px] bg-transparent border-0 cursor-pointer h-[30px] text-[12px] p-0 "
            dropdownButtonStyle="top-2 right-0"
            label=""
            placeholder="End Date"
            readOnly
            dropdownIcon
            setSelectedDate={setEndDate}
            name="startDate"
            value={endDate ? endDate.toLocaleDateString() : ""}
          />
        </div>
      </div>
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <ReferralMilestonesChart />
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#2A4152] rounded-full w-2 h-2 "></span>
              <p className="text-[#8C97A7] text-[12px] ">30%</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-[#FFC107]  rounded-full w-2 h-2 "></span>
              <p className="text-[#8C97A7] text-[12px] ">30%</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-[#8FB7DD] rounded-full w-2 h-2 "></span>
              <p className="text-[#8C97A7] text-[12px] ">30%</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-[12px] font-[700] text-[#2A2E33] ">$50,000.00</p>
          <p className="text-[12px] font-[700] text-[#2A2E33] ">$50,000.00</p>
          <p className="text-[12px] font-[700] text-[#2A2E33] ">$50,000.00</p>
        </div>
      </div>
    </div>
  );
};

export default ReferralMilestones;
