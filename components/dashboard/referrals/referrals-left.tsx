import { Button } from "@/components/ui/button";
import GradientProgressBar from "./progress-bar";
import React from "react";
import CopyButton from "@/components/ui/copy-button";

const ReferralsLeft = () => {
  return (
    <div className="w-[49%] bg-white p-5 ">
      <p className="text-[12px] font-[600] ">My reward points</p>
      <p className="font-[700] text-[32px] ">302.56 pts</p>
      <p className="text-[12px] font-[600] mt-6 ">
        Earn Rent Discounts with Referrals
      </p>
      <div className="bg-[#FAFAFA] p-4 mt-5 rounded-[4px] ">
        <div className="flex items-center justify-between">
          <p className="text-[12px] text-grayText ">Your Referrals</p>
          <p className="text-[12px] text-grayText ">4</p>
        </div>
        <div className="flex items-center justify-between mt-5">
          <p className="text-[12px] text-grayText ">Paid Referrals</p>
          <p className="text-[12px] text-grayText ">4</p>
        </div>
        <div className="flex items-center justify-between mt-5">
          <p className="text-[12px] text-grayText ">Points you have</p>
          <p className="text-[12px] text-grayText ">302.56</p>
        </div>
        <p className="text-[12px] text-grayText mt-5 ">
          Earn 167 more points to reach the 30% milestone
        </p>
      </div>
      <GradientProgressBar />
      <div className="bg-[#FAFAFA] mt-6 p-2 rounded-[4px] ">
        <p className="text-[10px] ">
          Refer friends to earn points. Once you reach a milestone, you can
          redeem a rent discount or keep saving for a bigger reward. Your points
          reset after any redemption.
        </p>
        <Button className="bg-[#D9D9D9] text-[12px] text-grayText w-full mt-10 ">
          Keep referring to unlock
        </Button>
      </div>
      <div className=" border-b border-b-[#D9D9D9] py-5 text-[#474747] f ">
        <p className="font-[600] text-[12px] mt-10 ">Share</p>
      </div>
      <CopyButton name="COPY" value="SAMANTEX" />
      <CopyButton name="LINK" value="https://get.nuba.ukr/r/samantex" />
    </div>
  );
};

export default ReferralsLeft;
