import { ArrowRightIcon } from "@/assets/svg/arrow-right-icon";
import { CheckedIcon } from "@/assets/svg/ckecked-icon";
import { Button } from "@/components/ui/button";
import React from "react";

interface AutoPayOnProps {
  setTab: React.Dispatch<React.SetStateAction<"" | "autopay-setup">>;
  setMakePayment: React.Dispatch<
    React.SetStateAction<"" | "start" | "complete">
  >;
}
const AutopayOn: React.FC<AutoPayOnProps> = ({ setTab, setMakePayment }) => {
  return (
    <div className=" rounded-[4px] ">
      <div className="bg-[#F8F8F8] p-4">
        <div className="flex items-center justify-between border-b border-[#d9d9d9] pb-2">
          <div>
            <div className="flex items-center gap-1">
              <CheckedIcon />
              <p className="text-[12px] font-[500] ">Autopay activated</p>
            </div>
            <p className="text-[12px] text-[#999B9E] mt-1 ">
              Your payment of 1,223.88 is processing today
            </p>
          </div>
          <button onClick={() => setTab("autopay-setup")}>
            <ArrowRightIcon />
          </button>
        </div>
        <div className="flex items-center justify-between text-[#999B9E] mt-5">
          <p className="font-[600] text-[12px] ">Last autopay</p>
          <p className="text-[10px]">£1,223.88 Mar 01,2025</p>
        </div>
      </div>
      <div className="mt-2 bg-[#F8F8F8] p-4">
        <div className="flex items-center justify-between text-[#999B9E] ">
          <p className="font-[600] text-[12px] ">Total balance</p>
          <p className="text-[10px]">£1,223.88</p>
        </div>
        <Button
          onClick={() => setMakePayment("start")}
          className=" flex items-center justify-center w-full mt-2 "
        >
          Make Payment
        </Button>
      </div>
    </div>
  );
};

export default AutopayOn;
