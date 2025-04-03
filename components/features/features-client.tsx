import React from "react";
import Navbar from "@/components/layout/navbar";
import Features from "./features";
import FeaturesExtended from "@/components/features/features-extended";

const FeaturesClient = () => {
  return (
    <div className="w-full  bg-black text-white   ">
      <div className="px-6 md:px-[60px] lg:px-[120px] ">
        <Navbar hasBg />
        <Features />
      </div>
      <FeaturesExtended />
    </div>
  );
};

export default FeaturesClient;
