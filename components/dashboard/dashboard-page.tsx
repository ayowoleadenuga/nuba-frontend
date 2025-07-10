"use client";
import CopyButton from "@/components/ui/copy-button";
import { useRouter } from "nextjs-toploader/app";
import React, { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";

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
import { ArrowDownIcon } from "@/assets/svg/arrow-dropdown-icon";
import { ArrowRightIcon } from "@/assets/svg/arrow-right-icon";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentRentId } from "@/redux/features/rentSlice";
import { RootState } from "@/redux/store";
import { AddIcon } from "@/assets/svg/add-icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import NewPaymentForm from "@/components/sign-up/new-payment-method";
import AddNewRentForm from "@/components/dashboard/dashboard-components/add-new-rent";

const DashboardPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
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
  const currentRentId = useSelector(
    (state: RootState) => state.rent.currentRentId
  );
  const firstRentId = rents?.data?.[0]?.id;
  const rentIdtoUse = !currentRentId ? firstRentId : currentRentId;

  const {
    data: rentDetails,
    isLoading: isRentDetailsLoading,
    isError: isRentDetailsError,
    error: rentDetailsError,
  } = useGetUserRentsDetailsQuery(rentIdtoUse ?? skipToken);
  const rentDetail = rentDetails?.data;

  let nextPaymentDate: Date | undefined;
  let formattedNextPayment;
  let daysLeft: number | undefined;

  if (rentDetail?.dueDate) {
    nextPaymentDate = getNextPaymentDate(rentDetail.dueDate);
    if (nextPaymentDate) {
      formattedNextPayment = formatDateToDisplay(nextPaymentDate);
    }
  }

  if (rentDetail?.dueDate) {
    daysLeft = getDaysLeft(new Date(rentDetail.dueDate));
  }
  const [showModal, setShowModal] = useState(false);
  const [isArrowRotated, setIsArrowRotated] = useState(false);
  return (
    <div className="py-6 px-4">
      <p className="font-[600]  ">Welcome {userProfile?.firstName},</p>
      <button
        onClick={() => {
          setShowModal(prev => !prev);
          setIsArrowRotated(prev => !prev);
        }}
        className="flex items-center gap-2 text-[#2A4152] font-[500] mt-5"
      >
        Select home
        <ArrowDownIcon
          className={`transition-transform duration-300 ${
            isArrowRotated ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-start justify-start md:pl-[500px] pt-[10%]   ">
          <div className="bg-white p-6 rounded-[10px] w-[400px] max-w-md shadow-lg relative ">
            <h2 className="text-lg font-semibold mb-4">
              Select the home you want to make payment for
            </h2>
            <div className="  max-h-[70vh] md:max-h-[50vh] overflow-y-auto">
              <div className="flex flex-col gap-4">
                {rents?.data
                  ?.slice()
                  .sort((a, b) =>
                    a.id === rentIdtoUse ? -1 : b.id === rentIdtoUse ? 1 : 0
                  )
                  ?.map((rent, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        console.log("rent id", rent.id);
                        dispatch(setCurrentRentId(rent.id));
                        setShowModal(false);
                      }}
                      className={`border w-full  hover:border-black rounded-[4px] h-[128px] flex justify-between items-center px-5 cursor-pointer ${
                        rent.id === rentIdtoUse
                          ? "border-black"
                          : "border-gray-300"
                      }  `}
                    >
                      <div>
                        {" "}
                        <p className="font-[600] ">Greenwood Apartments </p>
                        <span className="text-[#474747CC]/80 text-[10px] flex items-center gap-1">
                          <p className=" ">123 Main Street, {rent.country} </p>
                          <span className="bg-[#2A4152] rounded-full h-[3px] w-[3px] "></span>
                          <p>
                            {userProfile?.firstName} {userProfile?.lastName}{" "}
                          </p>
                        </span>
                        <p className="text-[#474747CC]/80 text-[10px]">
                          Rent due in {getDaysLeft(new Date(rent.dueDate))} days
                        </p>
                      </div>

                      <ArrowRightIcon />
                    </div>
                  ))}
              </div>
              <Accordion type="single" collapsible className="mt-4">
                <AccordionItem value="item-1" className="border-0 ">
                  <AccordionTrigger dropdownVisible>
                    <div className="text-[12px] flex gap-3 items-center  ">
                      {" "}
                      <span className="flex items-center justify-center w-[30px] h-[30px] bg-[#2A4152] rounded-full  ">
                        <AddIcon fill="white" />
                      </span>{" "}
                      Add New Address
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <AddNewRentForm />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <button
              className="absolute top-2 right-2 text-gray-500 font-[700] hover:text-black"
              onClick={() => {
                setShowModal(false);
                setIsArrowRotated(false);
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

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
          <div className="bg-[#2A4152] py-7 px-10 text-white rounded-[8px]  w-full md:w-[80%] lg:w-[60%] xl:w-[40%] mt-5  ">
            <p className="font-[500] ">Rent Details</p>
            <p className="font-[500] mt-6 text-[32px]">
              £{rentDetail?.monthlyPrice.toLocaleString()}
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
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-6 w-fit">
              <button
                onClick={() => {
                  if (userProfile?.isKycVerified) {
                    router.push("/payment");
                  } else {
                    router.push("/kyc-verification");
                  }
                }}
                className="h-9 px-5 bg-white text-black rounded-[4px] text-[14px] mt-6 font-[600] "
              >
                Pay Now
              </button>
              {/* <button className="h-9 px-5 bg-white text-black rounded-[4px] text-[14px] mt-6 font-[600] ">
                Custom Plan
              </button> */}
            </div>
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
              <div className="border border-[#D9D9D9]] rounded-[8px] p-2 md:p-3 w-fit">
                <p className="text-[10px] md:text-[12px] font-[500]">
                  Rent Day
                </p>
                <p className="text-[24px] md:text-[32px] font-[500]">
                  {daysLeft}
                </p>
                <p className="text-[12px] font-[500]">Days Left</p>
              </div>

              <div className="border border-[#D9D9D9]] rounded-[8px] p-2 md:p-3 w-fit">
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

              <div className="border border-[#D9D9D9]] rounded-[8px] p-2 md:p-3 w-fit">
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
