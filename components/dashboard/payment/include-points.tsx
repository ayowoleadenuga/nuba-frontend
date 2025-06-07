import { ArrowLeftIcon } from "@/assets/svg/arrow-left";
import GradientProgressBar from "@/components/dashboard/referrals/progress-bar";
import { Button } from "@/components/ui/button";
import { useGetUserProfileQuery } from "@/redux/features/userApiSlice";
import React from "react";

interface IncludePointsProps {
  setTab: React.Dispatch<
    React.SetStateAction<"" | "autopay-setup" | "include-points">
  >;
}
const IncludePoints: React.FC<IncludePointsProps> = ({ setTab }) => {
  const { data: userProfileDetails } = useGetUserProfileQuery();
  const userProfile = userProfileDetails?.data;

  const nextMilestone = () => {
    const milestone = userProfile?.statistics.mileStone;

    if (milestone !== undefined) {
      if (milestone < 30) {
        return "30%";
      } else if (milestone < 60) {
        return "60%";
      } else {
        return "100%";
      }
    }

    return "0%";
  };

  return (
    <div className="w-full md:w-[60%] xl:w-[40%] ">
      {" "}
      <button
        onClick={() => setTab("")}
        className="text-[12px] font-[600] my-5 flex items-center gap-2"
      >
        <ArrowLeftIcon /> Credit allocation
      </button>
      <div className="w-full bg-white mt-5 py-5 px-3 ">
        <div className="bg-[#FAFAFA] p-4 mt-5 rounded-[4px] ">
          <div className="flex items-center justify-between">
            <p className="text-[12px] text-grayText ">Your Referrals</p>
            <p className="text-[12px] text-grayText ">
              {userProfile?.statistics.totalReferral}
            </p>
          </div>
          <div className="flex items-center justify-between mt-5">
            <p className="text-[12px] text-grayText ">Paid Referrals</p>
            <p className="text-[12px] text-grayText ">4</p>
          </div>
          <div className="flex items-center justify-between mt-5">
            <p className="text-[12px] text-grayText ">Points you have</p>
            <p className="text-[12px] text-grayText ">
              {userProfile?.statistics.unitBalance}
            </p>
          </div>
          <p className="text-[12px] text-grayText mt-5 ">
            Earn
            <span className="mr-1 text-brandCore-orange "> 167</span>
            more points to reach the {nextMilestone()} milestone
          </p>
        </div>
        <GradientProgressBar percentage={userProfile?.statistics?.mileStone} />
        <div className="p-2 bg-[#fafafa] mt-5 ">
          <p className="text-[10px] ">
            Refer friends to earn points. Once you reach a milestone, you can
            redeem a rent discount or keep saving for a bigger reward. Your
            points reset after any redemption.
          </p>
        </div>
        <div className="  p-2 rounded-[4px] ">
          <Button className="bg-[#D9D9D9] text-[12px] text-grayText w-full mt-5 ">
            Keep referring to unlock
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IncludePoints;
