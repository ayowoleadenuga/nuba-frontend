import ReferralsLeft from "./referrals-left";
import ReferralsRight from "./referrals-right";
import React from "react";

const ReferralsClient = () => {
  return (
    <div className="w-full p-5">
      <div className="pb-4 border-b border-b-[#D9D9D9] w-full ">
        <p className="text-[20px] font-[600] ">Referral & Reward Program</p>
      </div>
      <div className="flex w-full justify-between mt-5">
        <ReferralsLeft />
        <ReferralsRight />
      </div>
    </div>
  );
};

export default ReferralsClient;
