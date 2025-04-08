import { GetStartedButton } from "@/components/ui/get-started-button";
import React from "react";

const PaymentMethods = () => {
  return (
    <div className="paymentMethodBgImage h-[80vh] bg-black w-full text-white pt-10 flex flex-col md:items-center px-6 md:px-0  ">
      <p className="font-[600] text-[32px] md:text-[46px]  ">Payment methods</p>
      <p className=" text-[18px] w-full md:w-[60%] ">
        With our diverse range of payment methods, Earn Rewards from your credit
        card, enjoy flexible payments, and pay rent instantly—even
        internationally—with a method that suits you.
      </p>
      <GetStartedButton className="bg-white text-black mt-9" />
    </div>
  );
};

export default PaymentMethods;
