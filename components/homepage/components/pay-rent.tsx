import { GetStartedButton } from "@/components/ui/get-started-button";
import React from "react";

const PayRent = () => {
  return (
    <div className="payRentBgImage h-[70vh] bg-black w-full text-white pt-10 flex flex-col items-center px-6 md:px-0 ">
      <p className="font-[600] text-[32px] md:text-[48px] text-center ">
        Pay rent easily, anytime, anywhere.
      </p>
      <p className="text-center text-[18px] w-full md:w-[58%] ">
        Your time matters, so we make rent payments quick and hassle-free. Just
        select your card, enter your details, and pay in seconds!
      </p>
      <GetStartedButton className="bg-white text-black mt-9" />
    </div>
  );
};

export default PayRent;
