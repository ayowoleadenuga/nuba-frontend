"use client";
import OverallSalesChart from "./overall-sales-chart";
import NubaInput from "@/components/ui/nuba-input";
import React, { useState } from "react";

const OverallSalesAnalytics = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  return (
    <div className="w-[70%] h-fit border rounded-[8px] border-[#D9D9D9] mt-3 bg-[#f7f9fc] p-3 ">
      <p className="text-grayText font-[500] text-[12px] ">Overall Sales</p>
      <div className="flex items-center justify-between w-full">
        <p className="text-[32px] font-[600] text-[#2A4152] ">£991,306.72</p>
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
      <div className="w-full h-[300px] ">
        <OverallSalesChart />
      </div>
    </div>
  );
};

export default OverallSalesAnalytics;
