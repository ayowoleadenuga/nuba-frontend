import { ArrowRightIcon } from "@/assets/svg/arrow-right-icon";
import { CheckedIcon } from "@/assets/svg/ckecked-icon";
import { Button } from "@/components/ui/button";
import {
  useGetUserRentsDetailsQuery,
  useGetUserRentsQuery,
} from "@/redux/features/rentsApiSlice";
import { useGetUserProfileQuery } from "@/redux/features/userApiSlice";
import { RootState } from "@/redux/store";
import { AutoPayOnProps } from "@/types";
import { formatDateToDisplay, getDaysLeft, getNextPaymentDate } from "@/utils";
import { skipToken } from "@reduxjs/toolkit/query";
import { useRouter } from "nextjs-toploader/app";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const AutopayOn: React.FC<AutoPayOnProps> = ({
  setTab,
  initiatePaymentLoading,
  handleInitiatePayment,
  upcomingRentPaymentsLoading,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
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

  const {
    data: userProfileDetails,
    isLoading: isUserProfileLoading,
    isError: isUserProfileError,
  } = useGetUserProfileQuery();
  const userProfile = userProfileDetails?.data;
  return (
    <div className=" rounded-[4px] ">
      <div className="bg-white p-4">
        <div className="flex items-center justify-between border-b border-[#d9d9d9] pb-2">
          <div className="cursor-pointer">
            <div className="flex items-center gap-1">
              <CheckedIcon />
              <p className="text-[12px] font-[500] ">Autopay activated</p>
            </div>
            <p className="text-[12px] text-[#999B9E] mt-1 ">
              Your payment of £
              {rentDetail &&
                (rentDetail?.monthlyPrice + 23.88).toLocaleString()}{" "}
              is processing in {daysLeft} days
            </p>
          </div>
          <button onClick={() => setTab("autopay-setup")}>
            <ArrowRightIcon />
          </button>
        </div>
        {/* <div className="flex items-center justify-between text-[#999B9E] mt-5">
          <p className="font-[600] text-[12px] ">Last autopay</p>
          <p className="text-[10px]">£1,223.88 Mar 01,2025</p>
        </div> */}
      </div>
      <div className="mt-2 bg-white p-4">
        <div className="flex items-center justify-between text-[#999B9E] ">
          <p className="font-[600] text-[12px] ">Total balance</p>
          <p className="text-[10px]">
            {" "}
            £{rentDetail && (rentDetail?.monthlyPrice + 23.88).toLocaleString()}
          </p>
        </div>
        <Button
          onClick={() => {
            if (userProfile?.isKycVerified) {
              handleInitiatePayment();
            } else {
              router.push("/kyc-verification");
            }
          }}
          disabled={
            upcomingRentPaymentsLoading ||
            initiatePaymentLoading ||
            isUserProfileLoading ||
            isUserProfileError
          }
          className=" flex items-center justify-center w-full mt-2 "
        >
          {initiatePaymentLoading ? "Initiating Payment..." : "Make Payment"}
        </Button>
      </div>
    </div>
  );
};

export default AutopayOn;
