"use client";

import { Button } from "@/components/ui/button";
import GradientProgressBar from "./progress-bar";
import React from "react";
import CopyButton from "@/components/ui/copy-button";
import { useGetUserProfileQuery } from "@/redux/features/userApiSlice";
import ReferralSkeleton from "../skeletons/referral-skeleton";
import ErrorMessage from "../skeletons/error-message";
import { useGetreferralsQuery } from "@/redux/features/referralsApiSlice";

const ReferralsLeft = () => {
  const {
    data: userProfileDetails,
    isLoading: isUserProfileLoading,
    isError: isUserProfileError,
    error: userProfileError,
  } = useGetUserProfileQuery();
  const userProfile = userProfileDetails?.data;

  const { data: userReferrals } = useGetreferralsQuery();

  const userReferral = userReferrals?.data;

  const totalPoints = userReferral?.totalPoints ?? 0;

  const pointsTo30 = userReferral?.points_left_to_redeem?.["30_percent"] ?? 150;
  const pointsTo60 = userReferral?.points_left_to_redeem?.["60_percent"] ?? 300;
  const pointsTo100 =
    userReferral?.points_left_to_redeem?.["100_percent"] ?? 500;

  let pointsNeeded = 0;
  let milestoneLabel = "";

  if (totalPoints < pointsTo30) {
    pointsNeeded = pointsTo30 - totalPoints;
    milestoneLabel = "30%";
  } else if (totalPoints < pointsTo60) {
    pointsNeeded = pointsTo60 - totalPoints;
    milestoneLabel = "60%";
  } else if (totalPoints < pointsTo100) {
    pointsNeeded = pointsTo100 - totalPoints;
    milestoneLabel = "100%";
  }

  return (
    <div className="  w-full md:w-[49%] bg-white p-5 ">
      <p className="text-[12px] font-[600] ">My reward points</p>
      <p className="font-[700] text-[32px] text-[#2A4152] ">
        {userProfile?.statistics.unitsEarned} pts
      </p>
      <p className="text-[12px] font-[600] mt-6 ">
        Earn Rent Discounts with Referrals
      </p>
      <div className="bg-[#FAFAFA] p-4 mt-5 rounded-[4px] ">
        <div className="flex items-center justify-between">
          <p className="text-[12px] text-grayText ">Your Referrals</p>
          <p className="text-[12px] text-grayText ">
            {" "}
            {userReferral?.referrals?.length}
          </p>
        </div>
        <div className="flex items-center justify-between mt-5">
          <p className="text-[12px] text-grayText ">Paid Referrals</p>
          <p className="text-[12px] text-grayText ">4</p>
        </div>
        <div className="flex items-center justify-between mt-5">
          <p className="text-[12px] text-grayText ">Points you have</p>
          <p className="text-[12px] text-grayText ">
            {userReferral?.totalPoints}
          </p>
        </div>
        <p className="text-[12px] text-grayText mt-5 ">
          Earn
          <span className="mr-1 text-brandCore-orange "> {pointsNeeded}</span>
          more points to reach the {milestoneLabel} milestone
        </p>
      </div>
      <GradientProgressBar percentage={Number(milestoneLabel)} />
      <div className="p-2 bg-[#fafafa] mt-5 ">
        <p className="text-[10px] ">
          Refer friends to earn points. Once you reach a milestone, you can
          redeem a rent discount or keep saving for a bigger reward. Your points
          reset after any redemption.
        </p>
      </div>
      <div className="bg-white p-2 rounded-[4px] ">
        <Button className="bg-[#D9D9D9] text-[12px] text-grayText w-full mt-5 ">
          Keep referring to unlock
        </Button>
      </div>
      <div className=" border-b border-b-[#D9D9D9] py-5 text-[#474747] f ">
        <p className="font-[600] text-[12px] mt-10 ">Share</p>
      </div>

      {isUserProfileError ? (
        <ErrorMessage
          message={
            (userProfileError as any)?.data?.message ??
            "Unable to load user profile."
          }
        />
      ) : isUserProfileLoading || !userProfile ? (
        <ReferralSkeleton />
      ) : (
        <>
          <CopyButton name="COPY" value={userProfile.referralCode ?? ""} />
          <CopyButton name="LINK" value={userProfile.referralLink ?? ""} />
        </>
      )}
    </div>
  );
};

export default ReferralsLeft;
