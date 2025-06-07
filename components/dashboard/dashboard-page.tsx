"use client";
import CopyButton from "@/components/ui/copy-button";
import { RootState } from "@/redux/store";
import { useRouter } from "nextjs-toploader/app";
import React from "react";
import { skipToken } from "@reduxjs/toolkit/query/react";
import RentCardSkeleton from "./skeletons/rent-card-skeleton";
import {
  formatDateToDisplay,
  getDaysLeft,
  getDaySuffix,
  getNextPaymentDate,
} from "@/utils";
import RentStatsSkeleton from "./skeletons/rent-stats-skeleton";
import ErrorMessage from "./skeletons/error-message";
import ReferralSkeleton from "./skeletons/referral-skeleton";
import {
  useGetUserRentsDetailsQuery,
  useGetUserRentsQuery,
} from "@/redux/features/rentsApiSlice";
import { useGetUserProfileQuery } from "@/redux/features/userApiSlice";

const DashboardPage = () => {
  const router = useRouter();
  const {
    data: userProfileDetails,
    isLoading: isUserProfileLoading,
    isError: isUserProfileError,
    error: userProfileError,
  } = useGetUserProfileQuery();
  const userProfile = userProfileDetails?.data;

  const {
    data: rents,
    isLoading: isRentsLoading,
    isError: isRentsError,
    error: rentsError,
  } = useGetUserRentsQuery();
  const firstRentId = rents?.data?.[0]?.id;

  const {
    data: rentDetails,
    isLoading: isRentDetailsLoading,
    isError: isRentDetailsError,
    error: rentDetailsError,
  } = useGetUserRentsDetailsQuery(firstRentId ?? skipToken);
  const rentDetail = rentDetails?.data;

  let nextPaymentDate: Date | undefined;
  let formattedNextPayment;
  let daysLeft: number | undefined;

  if (rentDetail?.startDate) {
    nextPaymentDate = getNextPaymentDate(rentDetail.startDate);
    if (nextPaymentDate) {
      formattedNextPayment = formatDateToDisplay(nextPaymentDate);
    }
  }

  if (rentDetail?.dueDate) {
    daysLeft = getDaysLeft(new Date(rentDetail.dueDate));
  }

  return (
    <div className="py-6 px-4">
      <p className="font-[600] text-[12px] ">
        Welcome {userProfile?.firstName},
      </p>

      <div className=" border-b border-b-[#D9D9D9] pb-5">
        {isRentsError || isRentDetailsError ? (
          <ErrorMessage
            message={
              (rentsError as any)?.data?.message ??
              (rentDetailsError as any)?.data?.message ??
              "Unable to load rent data."
            }
          />
        ) : isRentsLoading || isRentDetailsLoading || !rentDetail ? (
          <RentCardSkeleton />
        ) : (
          <div className="bg-[#2A4152] py-7 px-10 text-white rounded-[8px]  w-full md:w-[80%] lg:w-[50%] xl:w-[40%] mt-5  ">
            <p className="font-[500] ">Rent Details</p>
            <p className="font-[500] mt-6 text-[32px]">
              £{rentDetail?.monthlyPrice}
            </p>
            <div className="mt-6">
              <p className="font-[700] text-[10px]"> Rent Frequency </p>
              <p className="font-[700] text-[12px]">
                {rentDetail?.rentFrequency}
              </p>
            </div>
            <div className="mt-6">
              <p className="font-[700] text-[10px]"> Address </p>
              <p className="font-[700] text-[12px]">{rentDetail?.country}</p>
            </div>
            <button
              onClick={() => router.push("/payment")}
              className="h-9 px-5 bg-white text-black rounded-[4px] text-[14px] mt-6 font-[600] "
            >
              Pay Now
            </button>
          </div>
        )}
      </div>

      <div className="border-b border-b-[#D9D9D9] py-5 text-[#474747]">
        {isRentsError || isRentDetailsError ? (
          <ErrorMessage
            message={
              (rentsError as any)?.data?.message ??
              (rentDetailsError as any)?.data?.message ??
              "Unable to load rent data."
            }
          />
        ) : isRentsLoading || isRentDetailsLoading || !rentDetail ? (
          <RentStatsSkeleton />
        ) : (
          <>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="border border-[#D9D9D9] rounded-[8px] p-2 md:p-3 w-fit">
                <p className="text-[10px] md:text-[12px] font-[500]">
                  Rent Day
                </p>
                <p className="text-[24px] md:text-[32px] font-[500]">
                  {daysLeft}
                </p>
                <p className="text-[12px] font-[500]">Days Left</p>
              </div>

              <div className="border border-[#D9D9D9] rounded-[8px] p-2 md:p-3 w-fit">
                <p className="text-[10px] md:text-[12px] font-[500]">
                  Next Payment
                </p>
                <p className="text-[24px] md:text-[32px] font-[500]">
                  {formattedNextPayment?.day}
                  <sup className="text-[20px]">
                    {getDaySuffix(formattedNextPayment?.day)}
                  </sup>
                </p>
                <p className="text-[12px] font-[500]">
                  {formattedNextPayment?.month}
                </p>
              </div>

              <div className="border border-[#D9D9D9] rounded-[8px] p-2 md:p-3 w-fit">
                <p className="text-[10px] md:text-[12px] font-[500]">
                  Rewards & Referral
                </p>
                <p className="text-[24px] md:text-[32px] font-[500]">
                  {userProfile?.statistics.unitsEarned}
                </p>
                <p className="text-[12px] font-[500]">
                  From {userProfile?.statistics.totalReferral} Referrals
                </p>
              </div>
            </div>
            <p className="font-[600] text-[12px] mt-10">Share</p>
          </>
        )}
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

export default DashboardPage;
