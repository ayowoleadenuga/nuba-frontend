import { ArrowRightIcon } from "@/assets/svg/arrow-right-icon";
import { SuccessIcon } from "@/assets/svg/success-icon";
import React from "react";

const PaymentResponse = () => {
  return (
    <div className="w-full flex items-center justify-center flex-col text-center gap-5 mt-10">
      <SuccessIcon />
      <p className="text-[24px] font-[500] ">Your payment has been submitted</p>
      <p className="font-[500] ">
        Kindly note that payment processing may take between 24 and 48 hours.
      </p>
      <button className="flex items-center gap-1 underline">
        View payment details <ArrowRightIcon />
      </button>
    </div>
  );
};

export default PaymentResponse;
