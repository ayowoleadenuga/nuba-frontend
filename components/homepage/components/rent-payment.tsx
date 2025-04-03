import React from "react";
import Image from "next/image";
import nuba from "@/assets/jpg/nuba.jpg";
const RentPayment = () => {
  return (
    <div className=" px-6 md:px-[60px] lg:px-[120px] w-full min-h-[90vh] overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 py-10 ">
      <div className="w-full md:w-[50%] ">
        <p className="font-[600] text-[32px] md:text-[45px] lg:text-[58px] xl:text-[64px] ">
          Rent Payments Fully Secured
        </p>
        <p className="text-[18px] flex items-center gap-1 flex-wrap">
          We prioritize your security with
          <span className="font-[700]"> advanced encryption, 3D </span>
          <span className="font-[700]"> Secure checks</span>, and
          <span className="font-[700]"> real-time fraud detection</span>
          <span>, ensuring </span>
          every rent payment is safe, seamless, and protected.
        </p>
      </div>
      <div className="w-full md:w-[50%] ">
        <Image src={nuba} alt="nuba" quality={100} />
      </div>
    </div>
  );
};

export default RentPayment;
