"use client";
import React from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { PointIcon } from "@/assets/svg/point-icon";
import TransactionTable from "./transaction-table";
import { IconButton } from "@mui/material";
import ammexCard from "@/assets/svg/amex-card.svg";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import { useGetUserProfileQuery } from "@/redux/features/userApiSlice";
import PointsDateJoinSkeleton from "../skeletons/points-date-join-skeleton";
import { useGetUserTransactionsQuery } from "@/redux/features/transactionsApiSlice";
import {
  useGetUserRentsDetailsQuery,
  useGetUserRentsQuery,
} from "@/redux/features/rentsApiSlice";
import { useGetDiscountQuery } from "@/redux/features/paymentsApiSlice";
import { useGetreferralsQuery } from "@/redux/features/referralsApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const TransactionClient = () => {
  const router = useRouter();

  const { data: userProfileDetails, isLoading: isProfileDetailsLoading } =
    useGetUserProfileQuery();
  const userProfile = userProfileDetails?.data;

  const { data: rents } = useGetUserRentsQuery();
  const currentRentId = useSelector(
    (state: RootState) => state.rent.currentRentId
  );
  const firstRentId = rents?.data?.[0]?.id;
  const rentIdtoUse = !currentRentId ? firstRentId : currentRentId;

  const { data: rentDetails } = useGetUserRentsDetailsQuery(
    rentIdtoUse ?? skipToken
  );
  const rentDetail = rentDetails?.data;

  const joinedYear = React.useMemo(() => {
    if (!userProfile?.joinedAt) return "";
    const date = new Date(userProfile.joinedAt);
    return `${date.getFullYear().toString().slice(-2)}`;
  }, [userProfile?.joinedAt]);

  const { data: discount, isLoading: discountLoading } = useGetDiscountQuery();
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
    <div className="w-full p-5 ">
      <div className="pb-4 border-b border-b-[#D9D9D9] w-full flex items-center justify-between ">
        <p className="text-[20px] font-[600] ">Transactions</p>
        <div className="flex items-center gap-4 ">
          {isProfileDetailsLoading ? (
            <PointsDateJoinSkeleton />
          ) : (
            <div>
              <div className="flex items-center gap-2">
                <PointIcon />
                <p className="font-[700] text-[#CF931D]">
                  {userProfile?.statistics?.unitsEarned} pts
                </p>
              </div>
              <p className="text-[11px] text-[#999B9E]">
                Member since ‘{joinedYear}
              </p>
            </div>
          )}
          {/* <IconButton>
            <OptionsIcon />
          </IconButton> */}
        </div>
      </div>
      <div className="bg-white">
        <p className="font-[600] text-[12px] mt-7 ">Recent Transactions</p>
        <div className="bg-[#FAFAFA] p-4 rounded-[4px] w-full md:w-[50%] ">
          <div className="flex items-center justify-between">
            <p className="text-[12px] text-grayText ">Your Rent</p>
            <p className="text-[12px] text-grayText ">
              £{(rentDetail?.monthlyPrice ?? 0)?.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center justify-between mt-5">
            <p className="text-[12px] text-grayText ">Total Rent Paid</p>
            <p className="text-[12px] text-grayText ">
              £{userProfile?.statistics.rentPaidAmount}
            </p>
          </div>
          <div className="flex items-center justify-between mt-5">
            <p className="text-[12px] text-grayText ">Discount Deductions</p>
            <p className="text-[12px] text-grayText ">
              {discountLoading ? "Loading..." : ` £${discount?.data?.discount}`}
            </p>
          </div>
          <p className="text-[12px] text-grayText mt-5 ">
            Earn
            <span className="mr-1 text-brandCore-orange "> {pointsNeeded}</span>
            more points to reach the {milestoneLabel} milestone
          </p>
        </div>

        <TransactionTable />
        <div
          onClick={() => router.push("/transactions/1")}
          className="md:hidden block border border-[#d9d9d9] px-2 py-3 mt-4 cursor-pointer"
        >
          <div className="flex items-center justify-between w-full">
            <div className="w-[48%] ">
              <p className="uppercase text-[12px] font-[500] ">Rent Payment</p>
              <p className=" text-[10px] font-[500] ">01/01/2025 11:19 AM</p>
            </div>
            <div className="w-[48%] ">
              <p className="uppercase text-[12px] font-[500] text-end ">
                {" "}
                -£1,200.00
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image src={ammexCard} alt="ammex" />
                  <p className=" text-[8px] font-[500] ">Amex Card</p>
                </div>

                <p className=" text-[8px] font-[500] ">..4308</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionClient;
