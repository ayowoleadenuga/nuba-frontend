"use client";
import React, { useState } from "react";
import { CheckedIcon } from "@/assets/svg/ckecked-icon";
import NubaInput from "@/components/ui/nuba-input";
import SupportFaqsContainer from "../support/support-faqs-container";
import { pointsFaqs } from "./constants";
import { useGetreferralsQuery } from "@/redux/features/referralsApiSlice";
import { formatDate3, formatDate4 } from "@/utils";
import empty from "@/assets/gif/empty.gif";
import Image from "next/image";
import { Loader } from "@/components/ui/loader";

const ReferralsRight = () => {
  const [faqQuestions, setFaqQuestions] = useState(pointsFaqs);

  const today = new Date();
  const defaultStart = new Date();
  defaultStart.setDate(today.getDate() - 30);

  const [startDate, setStartDate] = useState<Date>(defaultStart);
  const [endDate, setEndDate] = useState<Date>(today);

  const { data: userReferrals, isLoading: referralsLoading } =
    useGetreferralsQuery({
      startDate: formatDate4(startDate),
      endDate: formatDate4(endDate),
    });

  const userReferral = userReferrals?.data;

  return (
    <div className="w-full md:w-[49%]">
      <div className="bg-white p-5">
        <div className="w-full flex items-center justify-between">
          <p className="text-[12px] font-[600]">Referral history</p>
          <div className="border rounded-[4px] h-[30px] flex items-center gap-2 px-1 md:px-2">
            <NubaInput
              containerClass="w-[70px] md:w-[100px] space-y-0"
              inputClass="rounded-[8px] bg-transparent border-0 cursor-pointer h-[30px] text-[10px] md:text-[12px] p-0"
              dropdownButtonStyle="top-2 right-0"
              label=""
              placeholder="Start date"
              readOnly
              dropdownIcon
              setSelectedDate={setStartDate}
              name="startDate"
              value={startDate ? formatDate3(startDate) : ""}
            />
            <p className="font-[500] text-[14px]">-</p>
            <NubaInput
              containerClass="w-[70px] md:w-[100px] space-y-0"
              inputClass="rounded-[8px] bg-transparent border-0 cursor-pointer h-[30px] text-[10px] md:text-[12px] p-0"
              dropdownButtonStyle="top-2 right-0"
              label=""
              placeholder="End date"
              readOnly
              dropdownIcon
              setSelectedDate={setEndDate}
              name="endDate"
              value={endDate ? formatDate3(endDate) : ""}
            />
          </div>
        </div>

        <div className="rounded-[4px] border border-[#d9d9d9] mt-10">
          <p className="border-b border-b-[#d9d9d9] text-[11px] p-4 text-right">
            {formatDate3(startDate)} - {formatDate3(endDate)}
          </p>

          <div>
            {referralsLoading && (
              <div className="flex items-center justify-center py-10  ">
                <Loader />
              </div>
            )}
            {userReferral?.referrals?.length === 0 ? (
              <div className="flex items-center justify-center py-10 ">
                <Image
                  src={empty}
                  alt="empty"
                  className="w-[100px] h-[100px] "
                />
              </div>
            ) : (
              userReferral?.referrals?.map((ref, index: number) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-5"
                >
                  <div className="flex items-center gap-1">
                    <CheckedIcon />
                    <div>
                      <p className="text-[12px] font-[600]">
                        {ref.referred_user.name}
                      </p>
                      <p className="text-[10px] text-grayText">
                        {ref.referred_user.email}
                      </p>
                    </div>
                  </div>
                  <p className="text-[14px] font-[500]">
                    {ref.pointsEarned} points
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 bg-white p-5">
        <p className="text-[12px] font-[600] border-b border-b-border pb-5">
          Frequently Asked Questions
        </p>
        <SupportFaqsContainer
          faqQuestions={faqQuestions}
          setFaqQuestions={setFaqQuestions}
        />
      </div>
    </div>
  );
};

export default ReferralsRight;
